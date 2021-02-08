'use strict';

class GenerateApi {
    constructor(hcat) {
        this.endpoint = "/generate";
        this.hcat = hcat;
    }

    async generateHtml(payload) {
        let endpoint = this.endpoint;

        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        };

        return this.hcat.fetchWrapper(endpoint, options);
    }

    async fetchGenerateTemplates(type) {
        const options = {
            method: "GET",
        };

        return this.hcat.fetchWrapper(`/generate/${type}`, options);
    }
}

module.exports = GenerateApi;