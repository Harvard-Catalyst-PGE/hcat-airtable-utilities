'use strict';

/**
 * HCat API - D2L endpoints
 * 
 * Supported endpoints:
 *      Course:
 *          - importCourse()
 *          - getImportCourseJobStatus()
 *          - getCourseListing()
 *      OrgUnit:
 *          - getOrgInfo()
 *      Users:
 *          - createUser()
 *          - fetchUser()
 *          - updateUserPassword()
 *          - createUserEnrollment()
 *          - deleteUserEnrollment()
 *      Content:
 *          - getContent()
 *          - createContent()
 *          - createDiscussionTopic()
 */

class D2LApi {
    constructor(hcat) {
        this.endpoint = "/d2l";
        this.hcat = hcat;
    }

    /**
     * Create Import course Copy Job.
     * 
     * @param {String} apiKey - LMS auth token.
     * @param {String|number} sourceId - ID for the source course.
     * @param {String|number} targetId - ID for the target course.
     * @param {Number} offset - Number of days to offset course dates.
     * @return {Object} - JobToken id to use for checking status of job.
     */
    async importCourse(sourceId, targetId, offset = null) {
        // Construct endpoint with Target Course
        let endpoint = `${this.endpoint}/${targetId}/import`;

        // Construct payload with Source Course Id
        const payload = {
            "SourceOrgUnitId": sourceId,
            "Components": null,
            "CallbackUrl": null,
            "DaysToOffsetDates": offset,
        }

        return this.hcat.fetchWrapper("POST", endpoint, payload);
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
    async getImportCourseJobStatus(targetId, jobId) {
        let endpoint = `${this.endpoint}/${targetId}/import/${jobId}`;

        let response = await this.hcat.fetchWrapper("GET", endpoint);
        return response.Status;
    }


    async getCourseListing({orgUnitId=null, queryParams = {}}) {
        let endpoint = `/d2l/orgstructure/`;

        // Request specific course if ID provided        
        if (orgUnitId) {
            endpoint += orgUnitId;
        }

        return this.hcat.fetchWrapper("GET", endpoint, null, queryParams);
    }

    async getOrgInfo(orgUnitId, target) {
        let endpoint = `/d2l/${orgUnitId}/${target}`;
        return this.hcat.fetchWrapper("GET", endpoint);
    }

    async createUser(payload) {
        let endpoint = `/d2l/users`;
        return this.hcat.fetchWrapper("POST", endpoint, payload);
    }

    async fetchUser(queryParams) {
        let endpoint = `/d2l/users`;
        return this.hcat.fetchWrapper("GET", endpoint, null, queryParams);
    }

    async updateUserPassword(userId, password) {
        let endpoint = `/d2l/users/${userId}/password`;
        let payload = {"Password": password}

        return this.hcat.fetchWrapper("PUT", endpoint, payload);
    }

    async createUserEnrollment(orgUnitId, user) {
        let endpoint = `/d2l/${orgUnitId}/enroll/${user.fields.Identifier}`;

        const payload = {
            "RoleId": user.fields.RoleId,
        }

        return this.hcat.fetchWrapper("POST", endpoint, payload);
    }

    async deleteUserEnrollment(orgUnitId, userId) {
        let endpoint = `/d2l/${orgUnitId}/enroll/${userId}`;
        return this.hcat.fetchWrapper("DELETE", endpoint);
    }

    async getContent(orgUnitId, type, id, file=false) {
        let endpoint = `/d2l/${orgUnitId}/${type}/${id}`;

        if (file) {
            endpoint += "/file";
        }

        return this.hcat.fetchWrapper("GET", endpoint);
    }

    async createContent(payload) {
        let endpoint = `/d2l/${payload.OrgUnitProperties.Identifier}/${payload.type}`;
        return this.hcat.fetchWrapper("POST", endpoint, payload);
    }

    async createDiscussionTopic(payload) {
        let endpoint = `/d2l/${payload.OrgUnitProperties.Identifier}/discussions/${payload.parentModule.ForumId}/topics`;
        return this.hcat.fetchWrapper("POST", endpoint, payload);
    }
}

module.exports = D2LApi;