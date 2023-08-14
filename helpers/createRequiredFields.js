module.exports = {
    createRequiredFields: async function (table, requiredFields, model) {
        if (! table) {
            throw new Error(`Cannot check fields without a selected table.`);
        }

        if (!requiredFields) {
            console.log("No required fields for this action.");
            return;
        }

        for (let fieldName of requiredFields) {
            let requiredField = table.getFieldByNameIfExists(fieldName);
            let modelField = model.fields[fieldName];

            if (!requiredField) {
                console.log(`Creating ${modelField.type} field ${fieldName}`);
                
                if (table.hasPermissionToCreateField(fieldName, ...Object.values(modelField))) {
                    await table.createFieldAsync(fieldName, ...Object.values(modelField));
                    fields.push(fieldName);
                }
            } else if (requiredField.type !== modelField.type) {
                throw new Error(`${fieldName} field is not of type ${requiredField.type}. Please correct before continuing.`);
            }
        }

        return;
    }
}