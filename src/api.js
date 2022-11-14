const D2LApi = require('./d2l');

const formatQuery = require('../helpers').formatQuery;

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
     fetchWrapper(method, endpoint, payload=null, queryParams={}) {
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
        let url = this.server + endpoint + formatQuery(queryParams);

        return new Promise((resolve, reject) => {
            fetch(url, options)
                .then(async (res) => {
                    return await checkStatus(res);
                })
                .then(async (res) => {
                    const contentType = res.headers.get("Content-Type");
                    
                    if(!contentType) {
                        // No ontent type specified; just return
                        return resolve(res);
                    } else if (contentType.indexOf("application/json") !== -1) {
                        // Response is JSON, parse and return
                        const json = await res.json();
                        return resolve(json);
                    } else if (contentType.startsWith("text/")) {
                        // Response is text-like, parse and return
                        const text = await res.text();
                        return resolve(text);
                    } else if (contentType.indexOf("application/octet-stream") !== -1) {
                        // Response is a buffer; load data and return Reader
                        let reader = res.body.getReader();
                        return resolve(reader);
                    } else {
                        // Unknown content-type case; reject with message
                        console.error("UNKNOWN RESPONSE");
                        return reject(res);
                    }
                })
                .catch(err => {
                    return reject(err);
                });
        });
    }
};

async function checkStatus(res) {
    if (res.ok) {
        return res;
    } else {
        let message = res.statusText;

        try {
            let json = await res.json();
            
            if (json.Errors) {
                message = json.Errors.map((error) => {
                    return error.Message;
                });
            }
        } catch (e) {
            // Error is not JSON-formatted; do not handle
        }
        
        throw {
            status: res.status,
            statusText: message,
        };
    }
}

module.exports = HcatApi;