const FieldType = require('@airtable/blocks/models').FieldType;

module.exports = {
    "name": "Course Resources (copy)",
    "apiName": "Course Resources",
    "required": [
        {
            "name": "Resource",
            "type": FieldType.SINGLE_LINE_TEXT,
        },
        {
            "name": "Notes",
            "type": FieldType.RICH_TEXT,
        },
        {
            "name": "Template",
            "type": FieldType.URL,
        },
        {
            "name": "Inputs",
            "type": FieldType.MULTIPLE_RECORD_LINKS,
        },
    ]
};
