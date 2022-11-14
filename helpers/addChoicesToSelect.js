/**
 * Add Module names to Single Select choice options.
 * 
 * 
 * @param {*} table 
 * @param {*} fieldName 
 * @param {*} newChoices 
 */
module.exports = {
    addChoicesToSelect: async function (table, fieldName, results, deleteExisting = false) {
        // If field does not exist, do not attempt an update
        const field = table.getFieldByNameIfExists(fieldName);

        if (!field) {
            throw new Error(`Error updating field options. The field ${fieldName} does not exist.`);
        }

        // Add any new options to field      
        const names = new Set();  
        let choices = { choices: [] };
        let optionsOpts = { enableSelectFieldChoiceDeletion: deleteExisting };

        if (!deleteExisting) {
            // Start with existing, and get unique values
            choices.choices = [ ...field.options.choices ];
            field.options.choices.forEach(choice => {names.add(choice.name);});
        }
        
        // Extract new, unique, values from records
        for (const result of results) {
            let fieldOpt = result.fields[fieldName];

            if (fieldOpt && !names.has(fieldOpt.name)) {
                choices.choices.push(fieldOpt);
                names.add(fieldOpt.name);
            }
        }
        
        console.log(choices);
        // Update field with missing options
        if (!field.hasPermissionToUpdateOptions(choices)) {
            throw new Error(`Error updating field options. You do not have permissions to update options.`);
        }
        
        await field.updateOptionsAsync(choices, optionsOpts);
    }
}