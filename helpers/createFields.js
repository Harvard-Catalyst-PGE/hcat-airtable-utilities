function isDate(value) {
    if (!isNumberLike(value) || typeof value !== "string") {
        return false;
    }

    for (let element of ["-", ":", "/"]) {
        if (value.includes(element)) {
            return true;
        }
    }

    return false;
}

function isDateTime(value) {
    return isDate(value) && value.includes("T");
}

function isNumberLike(value) {
    if (typeof value === "number" || !isNaN(value) || !isNaN(Date.parse(value))) {
        return true;
    }

    return false;
}

/**
 * Field Factory
 * 
 * Returns `fieldConfig` for each field. Parses the type of field, and assigns
 * default field options, or customized if single/multi-select.
 * 
 * @param {*} fieldName 
 * @param {*} fieldValue 
 * @param {*} table 
 * @param {*} records 
 * @returns {Array[string, *]}
 */
function fieldFactory(fieldName, fieldValue, table, records) {
    if (typeof fieldValue === "boolean") {
        return ["checkbox", {"icon": "check", "color": "greenBright"}];
    } else if (!fieldValue) {
        return ["singleLineText"];
    } else if (Array.isArray(fieldValue)) {
        // Multiple select fields
        if (fieldValue[0] && Object.hasOwn(fieldValue[0], "url")) {
            return ["multipleAttachments"];
        } else if (fieldValue[0] && Object.hasOwn(fieldValue[0], "id") && fieldValue[0].id.startsWith("usr")) {
            return ["multipleCollaborators"];
        } else if (fieldValue[0] && Object.hasOwn(fieldValue[0], "id")) {
            console.warn("Creating Multiple Record Links field currently not supported. This operation may fail.");
            return;
            // return ["multipleRecordLinks", {"linkedTableId": "todo"}];
        } else {
            let options = getSelectOptions(table, records, fieldName);
            return ["multipleSelects", {"choices": options}];
        }
    } else if (typeof fieldValue === "object") {
        // Single select fields
        if (Object.hasOwn(fieldValue, "id")) {
            return ["singleCollaborator"];
        } else {
            let options = getSelectOptions(table, records, fieldName);
            return ["singleSelect", {"choices": options}];
        }
    } else if (isDateTime(fieldValue)) {
        return ["dateTime", {
            "dateFormat": {"name": "iso"}, 
            "timeFormat": {"name": "24hour", "format": "HH:mm"}, 
            "timeZone": "utc"
        }];
    } else if (isDate(fieldValue)) {
        return ["date", {"dateFormat": {"name": "iso"}}];
    } else if (isNumberLike(fieldValue) && (fieldName.toLowerCase() === "runtime" || fieldName.toLowerCase() === "duration")) {
        return ["duration", {"durationFormat": "h:mm:ss"}];
    } else if (isNumberLike(fieldValue)) {
        return ["number", {"precision": 0}];
    } else if (fieldValue.length > 32) {
        // Estimate long/rich text fields based on length
        return ["richText"];
    } else {
        // Assume single line text
        return ["singleLineText"];
    }
}

/**
 * 
 * @param {*} table 
 * @param {*} records 
 * @param {*} field 
 * @returns {Array<Object>}
 */
function getSelectOptions(table, records, field, addToExistingChoices = true) {
    // Keep unique list of names to avoid adding duplicates
    const names = new Set();
    
    // Options is list of actual values that will be added
    let options = [];
    let existingField = table.getFieldByNameIfExists(field);

    if (addToExistingChoices && existingField) {
        options = [ ...existingField?.options.choices ];
        options?.forEach(option => {names.add(option.name)});
    }

    // Iterate through all records to be created to get all possible values
    for (let record of records) {
        let choices = record.fields[field];
        
        if (!choices) {
            continue;
        }

        // Record is single-select, format as an array to process the same
        if (!Array.isArray(choices)) {
            choices = [choices];
        }

        for (const choice of choices) {
            if (choice && !names.has(choice.name)) {
                options.push(choice);
                names.add(choice.name);
            }
        }
    }

    return options;
}

module.exports = {
    createFields: async function (table, records) {
        if (!records || records.length <= 0) {
            console.log("No sample record(s) provided for this action.");
            return;
        }

        if (!table) {
            throw new Error(`Cannot check fields without a selected table.`);
        }

        let allFields = new Set();
        
        for (let record of records) {
            for (const [fieldName, fieldValue] of Object.entries(record.fields)) {
                // If no value exists, or field already created, don't re-add
                if (!fieldValue || allFields.has(fieldName)) {
                    continue;
                }

                allFields.add(fieldName);

                let fieldConfig = fieldFactory(fieldName, fieldValue, table, records);
                let existingField = table.getFieldByNameIfExists(fieldName);
                
                if (existingField && (existingField.type === "singleSelect" || existingField.type === "multipleSelects")) {
                    // If field already exists, see if 'select' and need to update options
                    console.log(`Updating field options ${fieldName}`);
                    await existingField.updateOptionsAsync(fieldConfig[1]);
                } else if (!existingField) {
                    // If field does not exist, create it
                    console.log(`Creating field ${fieldName}`);
                    await table.createFieldAsync(fieldName, ...fieldConfig);
                }
                
            }
        }
    }
}