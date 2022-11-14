module.exports = {
    validateTable: function (table, model, setResults) {
        // Track any problems
        let missing = [];
        let unmatched = [];

        for (let modelField of model.fields) {
            // Skip non-required fields
            if (!modelField.required) {
                continue;
            }

            let fieldIndex = table.fields.findIndex((tableField) => tableField.name === modelField.name);

            // Not found
            if (fieldIndex === -1) {
                missing.push(modelField);
                continue;
            }

            // Remove found field from table.
            let foundField = table.fields.splice(fieldIndex, 1)[0];
            
            // Found, but types don't match. Otherwise, continue
            if (foundField.type !== modelField.type) {
                unmatched.push(foundField);
            }
        }

        // Unmatched include mismatched types, and leftover fields from table
        setResults({
            missing: missing,
            unmatched: [...unmatched, ...table.fields],
        });

        // True if no missing fields. False otherwise.
        return missing.length === 0;
    }
}