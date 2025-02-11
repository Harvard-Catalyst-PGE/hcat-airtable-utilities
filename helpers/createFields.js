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

// Field config: (key, type, options)
function fieldFactory(fieldName, fieldValue, table, records) {
    if (typeof fieldValue === "boolean") {
        console.log("CREATING BOOLENA");
        return ["checkbox", {"icon": "check", "color": "greenBright"}];
    } else if (!fieldValue) {
        return ["singleLineText"];
    } else if (Array.isArray(fieldValue) && fieldValue[0] && Object.hasOwn(fieldValue[0], "url")) {
        return ["multipleAttachments"];
    } else if (Array.isArray(fieldValue) && fieldValue[0] && Object.hasOwn(fieldValue[0], "id") && fieldValue[0].id.startsWith("usr")) {
        return ["multipleCollaborators"];
    } else if (Array.isArray(fieldValue) && fieldValue[0] && Object.hasOwn(fieldValue[0], "id")) {
        throw new Error("Creating Multiple Record Links field currently not supported.");
        // return ["multipleRecordLinks", {"linkedTableId": "todo"}];
    } else if (Array.isArray(fieldValue)) {
        let options = getSelectOptions(table, records, fieldName);
        return ["multipleSelects", {"choices": options}];
    } else if (typeof fieldValue === "object" && Object.hasOwn(fieldValue, "id")) {
        return ["singleCollaborator"];
    } else if (typeof fieldValue === "object") {
        let options = getSelectOptions(table, records, fieldName);
        return ["singleSelect", {"choices": options}];
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
    const names = new Set();
    let options = [];
    let existingField = table.getFieldByNameIfExists(field);

    if (addToExistingChoices && existingField) {
        options = [ ...existingField?.options.choices ];
        existingField?.options.choices.forEach(choice => {names.add(choice.name)});
    }

    for (let record of records) {
        let choices = record.fields[field];
        
        if (!choices) {
            continue;
        }

        // Record is single-select, add to array to process the same
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

        // Base which fields to create off of a sample (first) record
        for (const [fieldName, fieldValue] of Object.entries(records[0].fields)) {
            if (!fieldName) {
                continue;
            }
            
            let fieldConfig = fieldFactory(fieldName, fieldValue, table, records);
            let existingField = table.getFieldByNameIfExists(fieldName);

            if (existingField && (existingField.type === "singleSelect" || existingField.type === "multipleSelects")) {
                // If field already exists, see if 'select' and need to update options
                console.log(`Updating field options ${fieldName}`);
                console.log(existingField);
                console.log(fieldConfig[1]);
                // await existingField.updateOptionsAsync(fieldConfig[1]);
            } else if (!existingField) {
                // If field does not exist, create it
                console.log(`Creating field ${fieldName}`);
                console.log(fieldValue);
                console.log(fieldConfig);
                await table.createFieldAsync(fieldName, ...fieldConfig);
            }
        }
    }
}