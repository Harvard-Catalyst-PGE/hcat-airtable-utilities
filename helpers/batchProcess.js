const checkPermissions = require('./checkPermissions').checkPermissions;
const BULK_PROCESS_MAX = 50;

module.exports = {
    batchProcess: async function (operation, table, data) {
        let recordIds = [];
        let records = [];

        if (operation === "create") {
            // records = data.filter(record => record);
            records = data;
        } else {
            records = data.filter(record => record && record.id !== undefined);
        }
    
        if (checkPermissions(operation, table, records)) {
            while(records.length > 0) {
                let subset = records.slice(0, BULK_PROCESS_MAX);
                switch (operation) {
                    case "create":
                        let results = await table.createRecordsAsync(subset);
                        // recordIds.push(...);
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