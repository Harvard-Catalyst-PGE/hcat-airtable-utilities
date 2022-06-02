'use strict';

class BaseApi {
    constructor(hcat, baseIds = {}) {
        this.hcat = hcat;
        this._directory = baseIds.directory ?? null;
        this._budget = baseIds.budget ?? null;
        this._dictionary = baseIds.dictionary ?? null;
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

    async makeRequest(apiKey, method, baseId, queryParams = {}, payload = null) {
        let options = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
            }
        }

        if (payload) {
            options.body = JSON.stringify(payload);
        }

        return this.hcat.fetchWrapper(`/${baseId}`, options, queryParams);
    }
}

module.exports = BaseApi;