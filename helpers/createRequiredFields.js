module.exports = {
    createRequiredFields: async function (table, requiredFields, model) {
        if (!requiredFields) {
            console.log("No required fields for this action.");
            return;
        }

        if (! table) {
            throw new Error(`Cannot check fields without a selected table.`);
        }

        for (let fieldName of requiredFields) {
            if (!fieldName) {
                continue;
            }

            let requiredField = table.getFieldByNameIfExists(fieldName);
            let modelField = model.fields[fieldName];

            if (!modelField) {
                throw new Error(`The '${fieldName}' field does not exist in the model.`);
            }

            if (!requiredField) {
                console.log(`Creating ${modelField.type} field ${fieldName}`);
                
                if (table.hasPermissionToCreateField(fieldName, ...Object.values(modelField))) {
                    await table.createFieldAsync(fieldName, ...Object.values(modelField));
                }
            } else if (requiredField?.type !== modelField.type) {
                throw new Error(`${fieldName} field is not of type ${requiredField.type}. Please correct before continuing.`);
            }
        }

        return requiredFields;
    }
}