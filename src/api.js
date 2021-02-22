const D2LApi = require('./d2l');
const RuntimeApi = require('./runtime');
const BaseApi = require('./base');
const GenerateApi = require('./generate');

class HcatApi {
    constructor(server, directory, budget, dictionary) {
        this._server = server;
        this.d2l = new D2LApi(this);
        this.runtime = new RuntimeApi(this);
        this.base = new BaseApi(this, directory, budget, dictionary);
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
        if (Object.keys(queryParams).length >= 0) {
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
                .then(async (resp) => {
                    if (! resp.ok) {
                        return reject(resp);
                    }

                    const data = await resp.json();
                    return resolve(data);
                })
                .catch(err => {
                    return reject(err);
                });
        });
    }

    parseQueryParams(params) {
        let queryString = "?";
        
        for (const [key, value] of Object.entries(params)) {
            if ((typeof value === "string" && value.length > 0) || value) {
                queryString += `${key}=${value}&`;
            }
        }

        console.log(queryString);

        return queryString;
    }

};

module.exports = HcatApi;