const D2LApi = require('./d2l');
const RuntimeApi = require('./runtime');
const BaseApi = require('./base');
const GenerateApi = require('./generate');

class HcatApi {
    constructor(server, baseIds) {
        this._server = server;
        this.d2l = new D2LApi(this);
        this.runtime = new RuntimeApi(this);
        this.base = new BaseApi(this, baseIds);
        this.generate = new GenerateApi(this);
    }

    get server() {
        return this._server;
    }

    /**
     * Sends request to server via fetch API and handles error cases
     * @param {string} endpoint - server endpoint
     * @param {Object} options - options parameter for `fetch` call
     * @returns {Promise<Object>} - server response or error
     */
     fetchWrapper(endpoint, options={}, queryParams={}) {
        // Optionally format query params
        if (Object.keys(queryParams).length > 0) {
            endpoint += "?";
            
            for (const [key, value] of Object.entries(queryParams)) {
            
                if ((typeof value === "string" && value.length > 0) || value) {
                    endpoint += `${key}=${value}&`;
                }
            }
        }

        let url = this.server + endpoint;

        options['cors'] = true;

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