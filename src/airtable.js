'use strict';

/**
 * HCat API - Airtable endpoints
 * 
 * Supported endpoints:
 *          - getBudgets()
 */
class AirtableApi {
    constructor(hcat) {
        // this.endpoint = "/api/d2l";
        this.hcat = hcat;
    }

    /*--------------------------------------------------------------
    # AWARDS
    --------------------------------------------------------------*/
    async getBudgets({queryParams={}}={}) {
        let endpoint = `/api/${this.hcat.budget}/Courses Year ${queryParams.year}`;
        const response = await this.hcat.fetchWrapper({endpoint: endpoint, queryParams: queryParams});

        if (response) {
            let localOptions = response.map(result => ({
                value: result.id,
                label: result.fields["Course Iteration"]
            }));
    
            return {localOptions: localOptions, rawValues: response};
        }
    }
    
    
}

module.exports = AirtableApi;