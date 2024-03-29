const checkPermissions = require('./checkPermissions').checkPermissions;
const BULK_PROCESS_MAX = 50;

module.exports = {
    batchProcess: async function (operation, table, records = []) {
        console.log(`Performing batch ${operation} of records in Airtable.`);
        console.log(records);
        
        let recordIds = [];
    
        if (checkPermissions(operation, table, records)) {
            while(records.length > 0) {
                let subset = records.slice(0, BULK_PROCESS_MAX);
                switch (operation) {
                    case "create":
                        let results = await table.createRecordsAsync(subset);
                        recordIds.push(...results);
                        break;
                    case "update":
                        await table.updateRecordsAsync(subset);
                        break;
                    case "delete":
                        await table.deleteRecordsAsync(subset);
                        break;
                    default:
                        break;
                }
                records = records.slice(BULK_PROCESS_MAX);
            }
        } else {
            console.error(`Missing permissions to ${operation} table: '${table.name}'.`);
        }
    
        return recordIds;
    }
}