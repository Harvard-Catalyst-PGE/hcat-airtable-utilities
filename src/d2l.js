'use strict';

/**
 * HCat API - D2L endpoints
 * 
 * Supported endpoints:
 *      Awards:
 *          - createAward()
 *          - createAwardAssociation()
 *          - getAvailableAwards()
 *          - issueAward()
 *      Content:
 *          - getContent()
 *          - createContent()
 *          - createDiscussionTopic()
 *          - updateTopic()
 *          - uploadFile()
 *      Course:
 *          - getCourseListing()
 *          - getImportCourseJobStatus()
 *          - importCourse()
 *      Data:
 *          - fetchDataSets()
 *          - getDataSets()
 *          - getSpecificDataSet()
 *          - downloadDataSet()
 *      Misc:
 *          - whoAmI()
 *      OrgUnit:
 *          - addReleaseCondition()
 *          - getOrgInfo()
 *      Users:
 *          - createUser()
 *          - fetchUser()
 *          - modifyUserEnrollment()
 *          - updatePreferredNames()
 *          - updateUserPassword()
 */
class D2LApi {
    constructor(hcat) {
        this.endpoint = "/api/d2l";
        this.hcat = hcat;
    }

    /*--------------------------------------------------------------
    # AWARDS
    --------------------------------------------------------------*/
    async createAward(payload) {
        let endpoint = `${this.endpoint}/awards`;

        let response = await this.hcat.fetchWrapper({method: "POST", endpoint: endpoint, payload: payload});
        return response;
    }
    
    async createAwardAssociation(orgUnitId, payload) {
        let endpoint = `${this.endpoint}/${orgUnitId}/associations`;
        let response = await this.hcat.fetchWrapper({method: "POST", endpoint: endpoint, payload: payload});
        return response;
    }

    async getAvailableAwards({orgUnitId: orgUnitId} = {}) {
        console.log(`getAvailableAwards for ${orgUnitId}`);
        if (!orgUnitId) {
            return false;
        }

        let endpoint = `${this.endpoint}/${orgUnitId}/associations`;
        const response = await this.hcat.fetchWrapper({endpoint: endpoint});

        if (response) {
            let localOptions = response.map(result => ({
                value: result.Award.AwardId,
                label: `${result.Award.Title} (Type ${result.Award.AwardType}-Id ${result.Award.AwardId})`,
            }));
    
            return {localOptions: localOptions, rawValues: response};
        }

        return {localOptions: [], rawValues: []};
    }

    async issueAward(orgUnitId, payload) {
        let endpoint = `${this.endpoint}/${orgUnitId}/issued`;
        return this.hcat.fetchWrapper({method: "POST", endpoint: endpoint, payload: payload});
    }

    /*--------------------------------------------------------------
    # CONTENT
    --------------------------------------------------------------*/
    async getContent(orgUnitId, type, id, file=false) {
        let endpoint = `${this.endpoint}/${orgUnitId}/${type}/${id}`;

        if (file) {
            endpoint += "/file";
        }

        return this.hcat.fetchWrapper({endpoint: endpoint});
    }

    async createContent(payload) {
        let endpoint = `${this.endpoint}/${payload.OrgUnitProperties.Identifier}/${payload.type}`;
        return this.hcat.fetchWrapper({method: "POST", endpoint: endpoint, payload: payload});
    }
    
    async createDiscussionTopic(payload) {
        let endpoint = `${this.endpoint}/${payload.OrgUnitProperties.Identifier}/discussions/${payload.parentModule.ForumId}/topics`;
        return this.hcat.fetchWrapper({method: "POST", endpoint: endpoint, payload: payload});
    }
    
    async updateTopic(payload, file=false) {
        let endpoint = `${this.endpoint}/${payload.OrgUnitProperties.Identifier}/topics/${payload.Id}`;

        if (file) {
            endpoint += "/file";
        }

        return this.hcat.fetchWrapper({method: "PUT", endpoint: endpoint, payload: payload});
    }

    async uploadFile(org, attachment, path) {
        let endpoint = `${this.endpoint}/${org.OrgUnitProperties.Identifier}/managefiles/file/upload`;
        return this.hcat.fetchWrapper({method: 'POST', endpoint: endpoint, payload: attachment});
    }
    /*--------------------------------------------------------------
    # COURSE
    --------------------------------------------------------------*/
    async getCourseListing({orgUnitId=null, queryParams={}} = {}) {
        let endpoint = `${this.endpoint}/orgstructure/`;

        // Request specific course if ID provided        
        if (orgUnitId) {
            endpoint += orgUnitId;
        }

        const response = await this.hcat.fetchWrapper({endpoint: endpoint, queryParams: queryParams});

        if (response) {
            response.sort((a, b) => a.Name.localeCompare(b.Name));

            let localOptions = response.map(result => ({
                value: result.Identifier,
                label: `${result.Name} (${result.Identifier}-${result.Code})`,
            }));
    
            return {localOptions: localOptions, rawValues: response};
        }
        
        return {localOptions: [], rawValues: []};
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
     * @param {String|number} targetId - ID for the target course.
     * @param {String} jobId - The JobToken for the copy.
     * @returns {String} The current status of the copy job.
     */
    async getImportCourseJobStatus(targetId, jobId) {
        let endpoint = `${this.endpoint}/${targetId}/import/${jobId}`;

        let response = await this.hcat.fetchWrapper({endpoint: endpoint});
        return response.Status;
    }

    /**
         * Create Import course Copy Job.
         * 
         * @param {String|number} sourceId - ID for the source course.
         * @param {String|number} targetId - ID for the target course.
         * @param {Number} offset - Number of days to offset course dates.
         * @return {Object} - JobToken id to use for checking status of job.
         */
    async importCourse(sourceId, targetId, offset = null) {
        let endpoint = `${this.endpoint}/${targetId}/import`;

        // Construct payload with Source Course Id
        const payload = {
            "SourceOrgUnitId": sourceId,
            "Components": null,
            "CallbackUrl": null,
            "DaysToOffsetDates": offset,
        }

        return this.hcat.fetchWrapper({method: "POST", endpoint: endpoint, payload: payload});
    }

    /*--------------------------------------------------------------
    # DATA
    --------------------------------------------------------------*/
    async fetchDataSets({schemaId: schemaId = null} = {}) {
        let endpoint = `${this.endpoint}/datasets/`;

        if (schemaId) {
            endpoint += schemaId;
        }
        const response = await this.hcat.fetchWrapper({endpoint: endpoint});

        return response;
    }
    
    async getDataSets({schemaId: schemaId = null} = {}) {
        console.log("Getting datasets");
        const DATASETS_TO_IGNORE = [
            "Activity",
            "Attendance",
            "Audio Video",
            "Calendar Events",
            "Checklist",
            "Condition",    // PreRequisites, Release Conditions
            "Course Publisher",
            "Creator",
            "Gradebook",
            "Grade Scheme",
            "JIT",
            "LTI",
            "Media",
            "Outcomes",
            "Portfolio",
            "Role Details",
            "Rubric",
            "SCORM",
            "Tools",
            "TurnItIn",
            "User Attribute",
        ]
        // let endpoint = `${this.endpoint}/datasets/`;

        // if (schemaId) {
        //     endpoint += schemaId;
        // }
        // const response = await this.hcat.fetchWrapper({endpoint: endpoint});

        const response = await this.fetchDataSets();
        
        if (response) {
            response.sort((a, b) => a.Full.Name.localeCompare(b.Full.Name));
            
            let localOptions = response.map(result => {
                return {
                    value: result.SchemaId,
                    label: `${result.Full.Name}`,
                }
            });

            localOptions = localOptions.filter((item) => {
                // console.log(item.label);
                for (let toIgnore of DATASETS_TO_IGNORE) {
                    if (item.label.includes(toIgnore)) {
                        // console.log(`Excluding ${item.label}`);
                        return;
                    }
                }
                
                return item;
            })
            
    
            console.log(localOptions);
            return {localOptions: localOptions, rawValues: response};
        }
        
        return {localOptions: [], rawValues: []};
    }

    async getSpecificDataSet({schemaId: schemaId, getFull: getFull = true} = {}) {
        if (!schemaId) {
            return false;
        }

        // return await this.getDataSets({schemaId: schemaId})
        const response = await this.fetchDataSets({schemaId: schemaId});

        if (response) {
            if (getFull) {
                // Only return the Full dataset - current workflow
                // return response.find(item => item.BdsType === "Full");
                const full = response.find(item => item.BdsType === "Full");

                const ExtractId = full.DownloadLink.split("extracts/")[1];
                return {PluginId: full.PluginId, ExtractId: ExtractId};

            } else {
                // Get all plugins - Full and Differential - for displaying in UI
                let localOptions = response.map(result => {
                    return {
                        value: result.PluginId,
                        label: `${result.BdsType} - ${result.CreatedDate}`,
                    }
                });
        
                console.log(localOptions);
                return {localOptions: localOptions, rawValues: response};
            }
        }
        
        return {localOptions: [], rawValues: []};
    }

    async downloadDataSet(schemaId, pluginId, extractId) {
        if (!schemaId || !pluginId || !extractId) {
            return false;
        }

        let endpoint = `${this.endpoint}/datasets/${schemaId}/${pluginId}/${extractId}`;
        return await this.hcat.fetchWrapper({endpoint: endpoint});
    }
    /*--------------------------------------------------------------
    # MISC
    --------------------------------------------------------------*/
    async whoAmI() {
        let endpoint = `${this.endpoint}/users/whoami`;
        return this.hcat.fetchWrapper({endpoint: endpoint});
    }
    
    /*--------------------------------------------------------------
    # ORG UNIT
    --------------------------------------------------------------*/
    async addReleaseCondition(orgUnitId, type, typeId, conditionType) {
        let endpoint = `${this.endpoint}/${orgUnitId}/conditionalRelease/${type}/${typeId}`;
        const payload = {
            "Operator": "All",
            "Type": conditionType,
        }
        return this.hcat.fetchWrapper({method: "PUT", endpoint: endpoint, payload: payload});
    }

    async getOrgInfo({orgUnitId=6606, target=""} = {}) {
        let endpoint = `${this.endpoint}/${orgUnitId}/${target}`;
        return this.hcat.fetchWrapper({endpoint: endpoint});
    }
    
    /*--------------------------------------------------------------
    # USERS
    --------------------------------------------------------------*/
    async importUsers(classlist=true) {
        if (classlist) {
            return this.getOrgInfo({target: "classlist"});
        } else {
            return this.fetchUser({});
        }
    }
    
    async createUser(payload) {
        let endpoint = `${this.endpoint}/users`;
        return this.hcat.fetchWrapper({method: "POST", endpoint: endpoint, payload: payload});
    }

    async fetchUser(queryParams) {
        let endpoint = `${this.endpoint}/users`;
        return this.hcat.fetchWrapper({endpoint: endpoint, queryParams: queryParams});
    }

    async updateUser(userId, payload) {
        let endpoint = `${this.endpoint}/users/${userId}`;
        return this.hcat.fetchWrapper({method: "PUT", endpoint: endpoint, payload: payload});
    }

    async modifyUserEnrollment(action, orgUnitId, user) {
        let endpoint = `${this.endpoint}/${orgUnitId}/enroll/${user.fields.Identifier}`;

        const method = (action === "enroll") ? "POST" : "DELETE";
        const payload = (action === "enroll") ? {"RoleId": user.fields.RoleId} : null;

        return this.hcat.fetchWrapper({method: method, endpoint: endpoint, payload: payload});
    }

    async updatePreferredNames(userId, payload) {
        let endpoint = `${this.endpoint}/users/${userId}/names`;
        return this.hcat.fetchWrapper({method: "PUT", endpoint: endpoint, payload: payload});
    }

    async updateUserActivation(user, active=true) {
        let endpoint = `${this.endpoint}/users/${user.fields.Identifier}/activation`;
        let payload = user.toCreateUserData(active);
    
        return this.hcat.fetchWrapper({method: "PUT", endpoint: endpoint, payload: payload});
    }

    async updateUserPassword(userId, password) {
        let endpoint = `${this.endpoint}/users/${userId}/password`;
        let payload = {"Password": password}

        return this.hcat.fetchWrapper({method: "PUT", endpoint: endpoint, payload: payload});
    }    
}

module.exports = D2LApi;