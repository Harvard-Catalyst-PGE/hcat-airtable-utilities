'use strict';

class RuntimeApi {
    constructor(hcat) {
        this.endpoint = "/runtime";
        this.hcat = hcat;
    }

    async fetchRuntimes(payload) {
        let endpoint = this.endpoint;

        const options = {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        };

        return this.hcat.fetchWrapper(endpoint, options);
    }
}

module.exports = RuntimeApi;