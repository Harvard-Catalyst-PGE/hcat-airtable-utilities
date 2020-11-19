exports.HcatApi = class {
    constructor(server, directory, budget, dictionary) {
        this._server = server;
        this._directory = directory;
        this._budget = budget;
        this._dictionary = dictionary;
    }

    get server() {
        return this._server;
    }

    get directory() {
        return this._directory;
    }

    get budget() {
        return this._budget;
    }

    get dictionary() {
        return this._dictionary;
    }

    /**
     * Sends request to server via fetch API and handles error cases
     * @param {string} endpoint - server endpoint
     * @param {Object} options - options parameter for `fetch` call
     * @returns {Promise<Object>} - server response or error
     */
     fetchWrapper(endpoint, options={}) {
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

    getBaseId(baseType) {
         if (baseType === "budget") {
             return this.budget;
         } else if (baseType === "course") {
             return this.dictionary;
         } else if (baseType === "directory") {
             return this.directory;
         } else {
             return null;
         }
    }

    async createRecords(apiKey, baseType, table, payload) {
        let baseId = this.getBaseId(baseType);

        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey
            },
            body: JSON.stringify(payload),
        };

        return this.fetchWrapper(`/${baseType}/${baseId}/${table}`, options);
    }

    async fetchRecords(apiKey, baseType, table) {
        let baseId = this.getBaseId(baseType);

        const options = {
            method: "GET",
            headers: {
                'x-api-key': apiKey,
            },
        };

        return this.fetchWrapper(`/${baseType}/${baseId}/${table}`, options);
    }

    async updateRecords(apiKey, baseType, table, payload) {
         let baseId = this.getBaseId(baseType);

        const options = {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey
            },
            body: JSON.stringify(payload),
        };

        return this.fetchWrapper(`/${baseType}/${baseId}/${table}`, options);
    }

    async generateHtml(payload) {
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        };

        return this.fetchWrapper('/generate', options);
    }

    async fetchGenerateTemplates(type) {
        const options = {
            method: "GET",
        };

        return this.fetchWrapper(`/generate/${type}`, options);
    }
};