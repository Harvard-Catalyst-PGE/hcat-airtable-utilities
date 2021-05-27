const FieldType = require('@airtable/blocks/models').FieldType;
const colors = require('@airtable/blocks/ui').colors;

module.exports = {
    "name": "Presenter Collection Form",
    "apiName": "Presenter Collection Form",
    "required": [
        {
            "name": "Preferred Name",
            "type": FieldType.SINGLE_LINE_TEXT,
        },
        {
            "name": "Degrees",
            "type": FieldType.MULTIPLE_SELECTS,
            "options": {
                "choices": []
            }
        },
        {
            "name": "Institution",
            "type": FieldType.SINGLE_LINE_TEXT,
        },
        {
            "name": "Professional Role/Title",
            "type": FieldType.SINGLE_LINE_TEXT
        },
        {
            "name": "Pronouns",
            "type": FieldType.SINGLE_LINE_TEXT
        },
        {
            "name": "Email",
            "type": FieldType.EMAIL
        },
        {
            "name": "Preferred Contact Number",
            "type": FieldType.PHONE_NUMBER
        },
        {
            "name": "Address",
            "type": FieldType.SINGLE_LINE_TEXT
        },
        {
            "name": "Biography",
            "type": FieldType.MULTIPLE_ATTACHMENTS
        },
        {
            "name": "Photo",
            "type": FieldType.MULTIPLE_ATTACHMENTS
        },
        {
            "name": "Assistant Name (optional)",
            "type": FieldType.SINGLE_LINE_TEXT
        },
        {
            "name": "Assistant Email",
            "type": FieldType.EMAIL
        },
        {
            "name": "Assistant Phone",
            "type": FieldType.PHONE_NUMBER
        },
        {
            "name": "Other Questions or Notes",
            "type": FieldType.RICH_TEXT
        },
        {
            "name": "Copied to 'Presenters'",
            "type": FieldType.CHECKBOX,
            "options": {
                "icon": 'check',
                "color": colors.GREEN_BRIGHT,
            }
        },
    ]
};
