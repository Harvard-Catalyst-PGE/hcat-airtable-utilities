'use strict';

/**
 * HCat API - Airtable endpoints
 * 
 * Supported endpoints:
 *          - getBudgets()
 */
class VideoApi {
    constructor(hcat) {
        // this.endpoint = "/api/d2l";
        this.hcat = hcat;
    }

    /*--------------------------------------------------------------
    # AWARDS
    --------------------------------------------------------------*/
    async getTranscriptBatch() {
        let endpoint = `/api/videos/3play/batches`;
        const response = await this.hcat.fetchWrapper({endpoint: endpoint});

        if (response) {
            // Sort results
            response.sort((a, b) => a.name.localeCompare(b.name));

            // Store to retrieve full object when selected
            // setBatches(response);

            let localOptions = response.map(result => ({
                value: result.id,
                label: `${result.name}`,
            }));
    
            return {localOptions: localOptions, rawValues: response};
        }
    }
}

module.exports = VideoApi;