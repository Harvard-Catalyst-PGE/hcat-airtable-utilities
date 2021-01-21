const FieldType = require('@airtable/blocks/models').FieldType;
const colors = require('@airtable/blocks/ui').colors;

module.exports = {
    "name": "Instructor (copy)",
    "apiName": "instructors",
    "required": [
        {
            "name": "Name",
            "type": FieldType.FORMULA,
            "options": {
                "formula": `IF({First Name}="", {Last Name}, {First Name}&" "&{Last Name})`
            }
        },
        {
            "name": "First Name",
            "type": FieldType.SINGLE_LINE_TEXT
        },
        {
            "name": "Last Name",
            "type": FieldType.SINGLE_LINE_TEXT
        },
        {
            "name": "Status",
            "type": FieldType.SINGLE_SELECT,
            "options": {
                "choices": [
                    {
                        "name": "In Consideration",
                        "color": colors.CYAN_LIGHT_1,
                    },
                    {
                        "name": "Invited",
                        "color": colors.BLUE_LIGHT_1,
                    },
                    {
                        "name": "Confirmed",
                        "color": colors.TEAL_LIGHT_1,
                    },
                    {
                        "name": "Call Scheduled",
                        "color": colors.GREEN_LIGHT_1,
                    },
                    {
                        "name": "Meeting Scheduled",
                        "color": colors.RED_LIGHT_1,
                    },
                    {
                        "name": "Recording Scheduled",
                        "color": colors.YELLOW_LIGHT_1,
                    },
                    {
                        "name": "Next Iteration",
                        "color": colors.PINK_LIGHT_1,
                    },
                ]
            }
        },
        {
            "name": "Professional Title",
            "type": FieldType.SINGLE_LINE_TEXT
        },
        {
            "name": "Role",
            "type": FieldType.SINGLE_LINE_TEXT
        },
        {
            "name": "Degrees",
            "type": FieldType.MULTIPLE_SELECTS,
            "options": {
                "choices": []
            }
        },
        {
            "name": "Email",
            "type": FieldType.EMAIL
        },
        {
            "name": "Phone",
            "type": FieldType.PHONE_NUMBER
        },
        {
            "name": "Institution",
            "type": FieldType.SINGLE_SELECT,
            "options": {
                "choices": []
            }
        },
        {
            "name": "Position/Rank",
            "type": FieldType.SINGLE_SELECT,
            "options": {
                "choices": []
            }
        },
        {
            "name": "Recording Date",
            "type": FieldType.SINGLE_LINE_TEXT
        },
        {
            "name": "Videos",
            "type": FieldType.MULTIPLE_RECORD_LINKS
        },
        {
            "name": "Paperwork on File",
            "type": FieldType.MULTIPLE_SELECTS,
            "options": {
                "choices": [
                    {
                        "name": "Speaker Consent",
                        "color": colors.BLUE_LIGHT_1,
                    },
                    {
                        "name": "Disclosure",
                        "color": colors.CYAN_LIGHT_1,
                    },
                    {
                        "name": "Job Description",
                        "color": colors.GREEN_LIGHT_1,
                    },
                ]
            }
        },
        {
            "name": "Honoraria",
            "type": FieldType.CURRENCY,
            "options": {
                "precision": 2,
                "symbol": "$",
            }
        },
        {
            "name": "1st Honoraria Payment",
            "type": FieldType.CHECKBOX,
            "options": {
                "icon": 'check',
                "color": colors.GREEN_BRIGHT,
            }
        },
        {
            "name": "2nd Honoraria Payment",
            "type": FieldType.CHECKBOX,
            "options": {
                "icon": 'check',
                "color": colors.GREEN_BRIGHT,
            }
        },
        {
            "name": "Honoraria Paid in Full",
            "type": FieldType.CHECKBOX,
            "options": {
                "icon": 'check',
                "color": colors.GREEN_BRIGHT,
            }
        },
        {
            "name": "Notes",
            "type": FieldType.RICH_TEXT
        },
        {
            "name": "Assistant Name",
            "type": FieldType.SINGLE_LINE_TEXT
        },
        {
            "name": "Assistant Contact Info",
            "type": FieldType.RICH_TEXT
        }
    ]
};
