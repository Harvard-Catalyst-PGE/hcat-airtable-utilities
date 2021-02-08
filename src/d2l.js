'use strict';

class D2LApi {
    constructor(hcat) {
        this.endpoint = "/d2l";
        this.hcat = hcat;
    }


    async createCourse(apiKey, payload) {
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
            },
            body: JSON.stringify(payload),
        }

        return this.hcat.fetchWrapper(`${this.endpoint}/courses`, options);
    }

    async getCourse(apiKey, courseId) {
        let endpoint = `${this.endpoint}/courses/${courseId}`;

        const options = {
            method: "GET",
            headers: {
                'x-api-key': apiKey
            }
        }

        return this.hcat.fetchWrapper(endpoint, options);
    }

    async getCourseListing({apiKey, orgUnitId=null, queryParams = {}}) {
        let endpoint = `/d2l/orgstructure/`;
        // let endpoint = `/d2l/orgstructure/${orgUnitId}/descendants/paged`;
        
        const options = {
            method: "GET",
            headers: {
                'x-api-key': apiKey
            }
        }

        // Request specific course if ID provided        
        if (orgUnitId) {
            endpoint += orgUnitId;
        }

        return this.hcat.fetchWrapper(endpoint, options, queryParams);
    }

    async getEnrollments(apiKey, orgUnitId) {
        let endpoint = `/d2l/${orgUnitId}/classlist`;

        const options = {
            method: "GET",
            headers: {
                'x-api-key': apiKey
            }
        }

        return this.hcat.fetchWrapper(endpoint, options);
    }

    async getRoles(apiKey, orgUnitId) {
        let endpoint = `/d2l/${orgUnitId}/roles`;

        const options = {
            method: "GET",
            headers: {
                'x-api-key': apiKey
            }
        }

        return this.hcat.fetchWrapper(endpoint, options);
    }

    async getTOC(apiKey, orgUnitId) {
        let endpoint = `/d2l/${orgUnitId}/toc`;
        
        const options = {
            method: "GET",
            headers: {
                'x-api-key': apiKey
            }
        }

        return this.hcat.fetchWrapper(endpoint, options);
    }
}

module.exports = D2LApi;