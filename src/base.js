'use strict';

class BaseApi {
    constructor(hcat, directory, budget, dictionary) {
        this.hcat = hcat;
        this._directory = directory;
        this._budget = budget;
        this._dictionary = dictionary;
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

    getQuery(baseType, query) {
        if (baseType === "budget") {
            return `?year=${query}`;
        } else {
            return `?tables[]=${query}`;
        }
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
        let query = this.getQuery(baseType, table);

        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey
            },
            body: JSON.stringify(payload),
        };

        return this.hcat.fetchWrapper(`/${baseType}/${baseId}${query}`, options);
    }

    async fetchRecords(apiKey, baseType, table) {
        let baseId = this.getBaseId(baseType);
        let query = this.getQuery(baseType, table);

        const options = {
            method: "GET",
            headers: {
                'x-api-key': apiKey,
            },
        };

        return this.hcat.fetchWrapper(`/${baseType}/${baseId}${query}`, options);
    }

    async updateRecords(apiKey, baseType, table, payload) {
        let baseId = this.getBaseId(baseType);
        let query = this.getQuery(baseType, table);

        const options = {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey
            },
            body: JSON.stringify(payload),
        };

        return this.hcat.fetchWrapper(`/${baseType}/${baseId}${query}`, options);
    }
}

module.exports = BaseApi;