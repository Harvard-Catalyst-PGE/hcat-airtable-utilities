'use strict';

/**
 * HCat API - D2L endpoints
 * 
 * Supported endpoints:
 *      Course:
 *          - createCourse()
 *          - getCourse()
 *          - importCourse()
 *          - getImportCourseJobStatus()
 *          - getCourseListing()
 *      Users:
 *          - getEnrollments()
 *          - getRoles()
 *          - createUser()
 *          - fetchUser()
 *          - createUserEnrollment()
 *          - deleteUserEnrollment()
 *      Content:
 *          - getTOC()
 *          - getTopicFile()
 */

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

    /**
     * Create Import course Copy Job.
     * 
     * @param {String} apiKey - LMS auth token.
     * @param {String|number} sourceId - ID for the source course.
     * @param {String|number} targetId - ID for the target course.
     * @return {Object} - JobToken id to use for checking status of job.
     */
    async importCourse(apiKey, sourceId, targetId) {
        // Construct endpoint with Target Course
        let endpoint = `${this.endpoint}/${targetId}/import`;

        // Construct payload with Source Course Id
        const payload = {
            "SourceOrgUnitId": sourceId,
            "Components": null,
            "CallbackUrl": null
        }

        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
            },
            body: JSON.stringify(payload),
        }

        return this.hcat.fetchWrapper(endpoint, options);
    }

    /**
     * Check copy job status.
     * 
     * Returns the current status of the given copy job for a Target course with
     * Job ID. Endpoint meant to be polled until a non "PENDING" or "PROCESSING"
     * status is returned.
     * 
     * It is the job of the caller to respect the API resources and restrict
     * calls after a number of iterations/times.
     * 
     * @param {String} apiKey - LMS auth token.
     * @param {String|number} targetId - ID for the target course.
     * @param {String} jobId - The JobToken for the copy.
     * @returns {String} The current status of the copy job.
     */
    async getImportCourseJobStatus(apiKey, targetId, jobId) {
        let endpoint = `${this.endpoint}/${targetId}/import/${jobId}`;

        const options = {
            method: "GET",
            headers: {
                'x-api-key': apiKey
            }
        }

        let response = await this.hcat.fetchWrapper(endpoint, options);
        return response.Status;
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

    async createUser(apiKey, payload) {
        console.log("UTILITY CREATE USER");
        let endpoint = `/d2l/users`;

        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
            },
            body: JSON.stringify(payload)
        }

        return this.hcat.fetchWrapper(endpoint, options);
    }

    async fetchUser(apiKey, queryParams) {
        let endpoint = `/d2l/users`;

        const options = {
            method: "GET",
            headers: {
                'x-api-key': apiKey
            }
        }

        return this.hcat.fetchWrapper(endpoint, options, queryParams);
    }

    async updateUserPassword(apiKey, userId, password) {
        let endpoint = `/d2l/users/${userId}/password`;

        const options = {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
            },
            body: JSON.stringify({"Password": password})
        }

        return this.hcat.fetchWrapper(endpoint, options);
    }

    async createUserEnrollment(apiKey, orgUnitId, userId, roleId) {
        let endpoint = `/d2l/${orgUnitId}/enroll/${userId}`;

        const payload = {
            "RoleId": roleId,
        }

        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
            },
            body: JSON.stringify(payload)
        }

        return this.hcat.fetchWrapper(endpoint, options);
    }

    async deleteUserEnrollment(apiKey, orgUnitId, userId) {
        let endpoint = `/d2l/${orgUnitId}/enroll/${userId}`;

        const options = {
            method: "DELETE",
            headers: {
                'x-api-key': apiKey,
            }
        }

        return this.hcat.fetchWrapper(endpoint, options);
    }

    async getTopicFile(apiKey, orgUnitId, topicId) {
        let endpoint = `/d2l/${orgUnitId}/topics/${topicId}/file`;
        
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