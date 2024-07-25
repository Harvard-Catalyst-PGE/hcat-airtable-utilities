const BULK_PROCESS_MAX = 50;

module.exports = {
    /**
     * 
     * @param {('create'|'update'|'delete')} operation 
     * @param {*} table 
     * @param {Array<*>} records 
     * @throws {Error} If no permissions, or fails to process records.
     * @returns 
     */
    batchProcess: async function (operation, table, records = []) {
        console.log(`Performing batch ${operation} of records in Airtable.`);
        console.log(records);
        
        let recordIds = [];

        while(records.length > 0) {
            let subset = records.slice(0, BULK_PROCESS_MAX);
            switch (operation) {
                case "create":
                    let results = await table.createRecordsAsync(subset);
                    recordIds.push(...results);
                    break;
                case "update":
                    await table.updateRecordsAsync(subset);
                    recordIds.push(...subset);
                    break;
                case "delete":
                    await table.deleteRecordsAsync(subset);
                    recordIds.push(...subset);
                    break;
                default:
                    throw new Error(`Unknown batch operation ${operation}`);
            }
            records = records.slice(BULK_PROCESS_MAX);
        }

        console.log(`Successfully ${operation}d ${recordIds.length} records`);
        return recordIds;
    }
}