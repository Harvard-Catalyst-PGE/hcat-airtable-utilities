const AirtableApi = require('./airtable');
const D2LApi = require('./d2l');
const VideoApi = require('./video');
const CourseMerchantApi = require('./courseMerchant');
const checkFetchStatus = require('../helpers').checkFetchStatus;
const parseResponse = require('../helpers').parseResponse;
const EXPIRY = 1000 * 60 * 60;  // Hour expiry time

class HcatApi {
    constructor(localStorage = null) {
        this._server = null;
        this.localStorage = localStorage;
        
        this.airtable = new AirtableApi(this.forApp("airtable"));
        this.lms = new D2LApi(this.forApp("lms", "d2l"));
        this.video = new VideoApi(this.forApp("video", "videos"));
        this.courseMerchant = new CourseMerchantApi(this.forApp("courseMerchant"));
        this.courseMerchantCRM = new CourseMerchantApi(this.forApp("courseMerchantCRM"));
    }

    forApp(app, endpointBase = null) {
        const parent = this;
        return {
            app,
            endpoint: `/foobar/api/${endpointBase ?? app}`,
            fetchWrapper: (options = {}) => {
                let endpoint = `/api/${endpointBase ?? app}`;

                if (options.endpoint) {
                    endpoint += options.endpoint;
                }

                return parent.fetchWrapper({...options, endpoint, app})
            },
            exchangeTokens: () => parent.exchangeTokens(app),
            getUser: () => parent.getUser(app),
            clearTokens: () => parent.clearTokens(app),
            setTokens: (tokens) => parent.setTokens(app, tokens),
            validateApiKey: () => parent.validateApiKey(app),
        }
    }

    /**
     * @returns {string}
     */
    get server() {
        return this._server;
    }

    set server(server) {
        this._server = server;
    }

    getUser(app) {
        let user = this.localStorage?.getItem(`${app}User`);
        return user ?? "Not logged in yet.";
    }

    formatApiUser(user) {
        let name = user.FirstName + " " + user.LastName;

        const userDisplay = `${name} (${user.Identifier})`;
        this.localStorage.setItem(`${user.app}User`, userDisplay);
        return userDisplay;
    }

    validateApiKey(app) {
        return this.localStorage?.getItem(app) !== null;
    }

    getAppTokens(app) {
        const expiry = this.localStorage.getItem(app + "Expiry");

        return {
            app,
            apiKey: this.localStorage.getItem(app),
            apiKeyIv: this.localStorage.getItem(app + "Iv"),
            tag: this.localStorage.getItem(app + "Tag"),
            refreshToken: this.localStorage.getItem(app + "Refresh"),
            refreshTokenIv: this.localStorage.getItem(app + "RefreshIv"),
            refreshTokenTag: this.localStorage.getItem(app + "RefreshTag"),
            expiry: expiry ? new Date(expiry) : null,
        }
    }

    clearTokens(app) {
        Object.keys(this.localStorage).forEach((key) => {
            if (key.startsWith(app)) {
                this.localStorage.removeItem(key);
            }
        });
    }

    setTokens(app, tokens) {
        const expiry = new Date();
        expiry.setTime(new Date().getTime() + EXPIRY);

        if (!tokens.authToken?.encryptedValue || !tokens.authToken.iv || !tokens.authToken.tag) {
            throw new Error("Invalid auth payload - missing auth token");
        }
        
        // Set in local storage
        this.localStorage.setItem(app, tokens.authToken.encryptedValue);
        this.localStorage.setItem(app + "Iv", tokens.authToken.iv);
        this.localStorage.setItem(app + "Expiry", expiry);
        this.localStorage.setItem(app + "Tag", tokens.authToken.tag);

        if (tokens.refreshToken) {
            this.localStorage.setItem(app + "Refresh", tokens.refreshToken?.encryptedValue);
            this.localStorage.setItem(app + "RefreshIv", tokens.refreshToken?.iv);
            this.localStorage.setItem(app + "RefreshTag", tokens.refreshToken?.tag);
        }
    }

    async exchangeTokens(app) {
        console.log(`Refreshing ${app} tokens`);
        if (app === "courseMerchant") {
            throw new Error("Course Merchant session expired. Please login again.");
        }
        const tokens = this.getAppTokens(app);

        const payload = {
            refreshToken: tokens.refreshToken,
            refreshTokenIv: tokens.refreshTokenIv,
            refreshTokenTag: tokens.refreshTokenTag,
        }

        const response = await this.fetchWrapper({
            app,
            method: 'POST',
            endpoint: `/auth/callback`,
            payload: payload,
            queryParams: {platform: (app === "lms") ? "d2l" : app},
            skipRefresh: true,
        });

        this.setTokens(app, response);
        return this.getAppTokens(app);
    }

    /**
     * Sends request to server via fetch API and handles error cases
     * @param {string} method - server endpoint
     * @param {string} endpoint - options parameter for `fetch` call
     * @param {Object|null} payload - options parameter for `fetch` call
     * @param {Object} queryParams - options parameter for `fetch` call
     * @returns {Promise<Object>} - server response or error
     */
     async fetchWrapper({app, method = "GET", endpoint = '', payload = null, queryParams = {}, fullUrl = null, skipRefresh = false} = {}) {
        if (!app) {
            throw new Error("fetchWrapper requires an app");
        }

        const now = new Date();
        let tokens = this.getAppTokens(app);

        if (!skipRefresh && tokens.expiry && tokens.expiry <= now) {
            tokens = await this.exchangeTokens(app);
        }

        let options = {
            method: method,
            // cors: true,
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': tokens.apiKey,
                'x-api-iv': tokens.apiKeyIv,
                'x-api-tag': tokens.tag,
            }
        }

        if ((method === "POST" || method === "PUT" || method === "PATCH") && payload) {
            if (payload instanceof FormData) {
                options.body = payload;
                options.headers['Content-Type'] = 'multipart/form-data';
            } else if (payload.relativePath !== undefined) {
                options.body = payload;
            } else {
                options.body = JSON.stringify(payload);
            }
        }

        // Format query params, adds "" if none
        const url = fullUrl ?? new URL(`${this.server}${endpoint}?${new URLSearchParams(queryParams)}`);
        const request = new Request(url, options);
        const res = await fetch(request);
        const checked = await checkFetchStatus(res);
        return await parseResponse(checked);
    }
};

module.exports = HcatApi;