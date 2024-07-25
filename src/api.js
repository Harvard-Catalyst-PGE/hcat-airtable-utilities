const AirtableApi = require('./airtable');
const D2LApi = require('./d2l');
const VideoApi = require('./video');
const checkFetchStatus = require('../helpers').checkFetchStatus;
const parseResponse = require('../helpers').parseResponse;
const EXPIRY = 1000 * 60 * 60;  // Hour expiry time

class HcatApi {
    #apiUser;
    #apiKey;
    #apiKeyIv;
    #refreshToken;
    #refreshTokenIv;

    constructor(server, baseIds, localStorage = null) {
        this._server = server;
        
        this.#apiUser = "";
        this.#apiKey = null;
        this.#apiKeyIv = null;
        this.#refreshToken = null;
        this.#refreshTokenIv = null;

        this.app = "";
        this.localStorage = localStorage;

        this.airtable = new AirtableApi(this);
        this.lms = new D2LApi(this);
        this.video = new VideoApi(this);

        // Base IDs for Airtable routes
        this._directory = baseIds.directory ?? null;
        this._budget = baseIds.budget ?? null;
        this._workplan = baseIds.workplan ?? null;
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
        let user = this.localStorage.getItem(`${app}User`);
        return user ?? "Not logged in yet.";
    }

    /**
     * @param {string} token
     */
    set apiKey(token) {
        this.#apiKey = token;
    }

    set apiKeyIv(iv) {
        this.#apiKeyIv = iv;
    }
    
    set refreshToken(token) {
        this.#refreshToken = token;
    }

    set refreshTokenIv(iv) {
        this.#refreshTokenIv = iv;
    }

    set apiUser(user) {
        let app = (user.UniqueName) ? "lms" : "airtable";
        let name = user.FirstName + " " + user.LastName;

        this.#apiUser = `${name} (${user.Identifier})`;
        this.localStorage.setItem(`${app}User`, this.#apiUser);
    }

    get directory() {
        return this._directory;
    }

    get budget() {
        return this._budget;
    }

    get workplan() {
        return this._workplan;
    }

    validateApiKey() {
        return this.#apiKey !== null;
    }

    getTokens(app) {
        this.#apiKey = this.localStorage.getItem(app);
        this.#apiKeyIv = this.localStorage.getItem(app + "Iv");
        this.#refreshToken = this.localStorage.getItem(app + "Refresh");
        this.#refreshTokenIv = this.localStorage.getItem(app + "RefreshIv");
        this.app = app;

        const expiry = this.localStorage.getItem(app + "Expiry");
        this.expiry = (expiry) ? new Date(expiry) : null;
    }

    setTokens(app, tokens) {
        const now = new Date();
        const expiry = new Date();
        expiry.setTime(now.getTime() + EXPIRY);

        // Set in memory
        this.#apiKey = tokens.authToken.encryptedValue;
        this.#apiKeyIv = tokens.authToken.iv;
        this.#refreshToken = tokens.refreshToken.encryptedValue;
        this.#refreshTokenIv = tokens.refreshToken.iv;
        this.expiry = expiry;
        this.app = app;
        
        // Set in local storage
        this.localStorage.setItem(app, tokens.authToken.encryptedValue);
        this.localStorage.setItem(app + "Iv", tokens.authToken.iv);
        this.localStorage.setItem(app + "Refresh", tokens.refreshToken.encryptedValue);
        this.localStorage.setItem(app + "RefreshIv", tokens.refreshToken.iv);
        this.localStorage.setItem(app + "Expiry", expiry);
    }

    async exchangeTokens() {
        console.log(`Refreshing ${this.app} tokens`);

        const payload = {
            refreshToken: this.#refreshToken,
            refreshTokenIv: this.#refreshTokenIv,
        }

        this.expiry = null;
        let response = await this.fetchWrapper({
            method: 'POST',
            endpoint: `/auth/callback`,
            payload: payload,
            queryParams: {platform: this.app}
        });
        this.setTokens(this.app, response);
        return;
    }

    /**
     * Sends request to server via fetch API and handles error cases
     * @param {string} method - server endpoint
     * @param {string} endpoint - options parameter for `fetch` call
     * @param {Object|null} payload - options parameter for `fetch` call
     * @param {Object} queryParams - options parameter for `fetch` call
     * @returns {Promise<Object>} - server response or error
     */
     async fetchWrapper({method = "GET", endpoint = '', payload = null, queryParams = {}, fullUrl = null} = {}) {
        const now = new Date();

        if (this.expiry && this.expiry <= now) {
            await this.exchangeTokens();
        }

        let options = {
            method: method,
            // cors: true,
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': this.#apiKey,
                'x-api-iv': this.#apiKeyIv,
            }
        }

        if ((method === "POST" || method === "PUT" || method === "PATCH") && payload) {
            if (payload instanceof FormData) {
                console.log("Adding form data directly");
                options.body = payload;
                options.headers['Content-Type'] = 'multipart/form-data';
            } else if (payload.relativePath !== undefined) {
                console.log("TEST FORCE CODE");
                options.body = payload;
            } else {
                options.body = JSON.stringify(payload);
            }
        }

        // Format query params, adds "" if none
        console.log(endpoint);
        let url = new URL(`${this.server}${endpoint}?${new URLSearchParams(queryParams)}`);
        
        let request = new Request(url, options);
        
        if (fullUrl) {
            request = new Request(fullUrl);
        }

        return new Promise((resolve, reject) => {
            fetch(request)
                .then(async (res) => {
                    return await checkFetchStatus(res);
                })
                .then(async (res) => {
                    return parseResponse(res, resolve, reject);
                })
                .catch(err => {
                    return reject(err);
                });
        });
    }
};

module.exports = HcatApi;