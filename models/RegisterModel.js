const FieldType = require('@airtable/blocks/models').FieldType;
const colors = require('@airtable/blocks/ui').colors;

module.exports = {
    "name": "Register",
    "apiName": "Register",
    "required": [
        {
            "name": "Item",
            "type": FieldType.SINGLE_LINE_TEXT,
        },
        {
            "name": "Priority",
            "type": FieldType.SINGLE_SELECT,
            "options": {
                "choices": [
                    {
                        "name": "Low",
                        "color": colors.GREEN_LIGHT_1,
                    },
                    {
                        "name": "Medium",
                        "color": colors.YELLOW_LIGHT_1,
                    },
                    {
                        "name": "High",
                        "color": colors.RED_LIGHT_1,
                    },
                ]
            }
        },
        {
            "name": "Status",
            "type": FieldType.SINGLE_SELECT,
            "options": {
                "choices": [
                    {
                        "name": "TODO",
                        "color": colors.GREEN_LIGHT_1,
                    },
                    {
                        "name": "In Progress",
                        "color": colors.YELLOW_LIGHT_1,
                    },
                    {
                        "name": "Done",
                        "color": colors.RED_LIGHT_1,
                    },
                ]
            }
        },
        {
            "name": "Notes",
            "type": FieldType.RICH_TEXT,
        },
        {
            "name": "Date Due",
            "type": FieldType.DATE,
        },
        {
            "name": "Associated Task",
            "type": FieldType.MULTIPLE_RECORD_LINKS,
            "options": {
                "linkedTableId": "Workplan Table"
            }
        },
    ]
};
