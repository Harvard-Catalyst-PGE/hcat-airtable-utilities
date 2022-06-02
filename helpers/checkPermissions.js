export default function checkPermissions(operation, table, records) {
    switch(operation) {
        case "create":
            return table.hasPermissionToCreateRecords(records);
        case "update":
            return table.hasPermissionToUpdateRecords(records);
        case "delete":
            return table.hasPermissionToDeleteRecords(records);
        default:
            return false;
    }
}