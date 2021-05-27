const FieldType = require('@airtable/blocks/models').FieldType;

module.exports = {
    "name": "Participants",
    "apiName": "Participants",
    "required": [
        {
            "name": "D2L User Id",
            "type": FieldType.NUMBER,
            "options": {
                "precision": 0,
            }
        },
        {
            "name": "First Name",
            "type": FieldType.SINGLE_LINE_TEXT,
        },
        {
            "name": "Last Name",
            "type": FieldType.SINGLE_LINE_TEXT,
        },
        {
            "name": "Username",
            "type": FieldType.SINGLE_LINE_TEXT,
        },
        {
            "name": "Password",
            "type": FieldType.SINGLE_LINE_TEXT,
        },
        {
            "name": "Enrolled",
            "type": FieldType.CHECKBOX,
            "options": {
                "icon": 'check',
                "color": colors.GREEN_BRIGHT,
            }
        },
        {
            "name": "Notes",
            "type": FieldType.RICH_TEXT,
        },

        
    ]
};
