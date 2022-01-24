const FieldType = require('@airtable/blocks/models').FieldType;

module.exports = {
    "name": "Course Dates",
    "apiName": "Course Dates",
    "required": [
        {
            "name": "Item",
            "type": FieldType.SINGLE_LINE_TEXT,
        },
        {
            "name": "Start Date",
            "type": FieldType.DATE,
            "options": {
                "dateFormat": {
                    "name": "iso"
                }
            }
        },
        {
            "name": "End Date",
            "type": FieldType.DATE,
            "options": {
                "dateFormat": {
                    "name": "iso"
                }
            }
        },
        {
            "name": "Notes",
            "type": FieldType.RICH_TEXT,
        },
    ]
};
