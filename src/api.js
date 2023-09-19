const D2LApi = require('./d2l');
const checkFetchStatus = require('../helpers').checkFetchStatus;
const parseResponse = require('../helpers').parseResponse;

class HcatApi {
    constructor(server, lmsDomain, baseIds) {
        this._server = server;
        this._lmsDomain = lmsDomain;
        this._apiKey = null;
        this.d2l = new D2LApi(this);

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
    
    /**
     * @returns {string}
     */
    get lmsDomain() {
        return this._lmsDomain;
    }

    /**
     * @param {string} token
     */
    set apiKey(token) {
        this._apiKey = token;
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

    /**
     * Sends request to server via fetch API and handles error cases
     * @param {string} method - server endpoint
     * @param {string} endpoint - options parameter for `fetch` call
     * @param {Object|null} payload - options parameter for `fetch` call
     * @param {Object} queryParams - options parameter for `fetch` call
     * @returns {Promise<Object>} - server response or error
     */
     async fetchWrapper({method = "GET", endpoint = '', payload = null, queryParams = {}, fullUrl = null} = {}) {
        let options = {
            method: method,
            cors: true,
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': this._apiKey,
            }
        }

        if ((method === "POST" || method === "PUT" || method === "PATCH") && payload) {
            options.body = JSON.stringify(payload);
        }

        // Format query params, adds "" if none
        let url = new URL(`${this.server}${endpoint}?${new URLSearchParams(queryParams)}`);

        if (fullUrl) {
            url = fullUrl;
        }

        const request = new Request(url, options);

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