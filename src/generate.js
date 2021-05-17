'use strict';

class GenerateApi {
    constructor(hcat) {
        this.hcat = hcat;
    }

    async generateCourse(payload) {
        let endpoint = "/generate/course";

        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        };

        return this.hcat.fetchWrapper(endpoint, options);
    }

    async generatePage(payload) {
        let endpoint = "/generate";

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