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
            "name": "Degrees",
            "type": FieldType.MULTIPLE_SELECTS,
            "options": {
                "choices": []
            }
        },
        {
            "name": "Institution",
            "type": FieldType.MULTIPLE_SELECTS,
            "options": {
                "choices": []
            }
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
            "name": "Assistant Name",
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
            "name": "Notes",
            "type": FieldType.RICH_TEXT
        },
        {
            "name": "Biography",
            "type": FieldType.RICH_TEXT
        },
        {
            "name": "Photo",
            "type": FieldType.MULTIPLE_ATTACHMENTS
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
            "name": "Session Type",
            "type": FieldType.SINGLE_SELECT,
            "options": {
                "choices": [
                    {
                        "name": "Lecture (10 min)",
                        "color": colors.PURPLE_LIGHT_1,
                    },
                    {
                        "name": "Lecture (25 min)",
                        "color": colors.BLUE_LIGHT_1,
                    },
                    {
                        "name": "Discussion (30 min)",
                        "color": colors.TEAL_LIGHT_1,
                    },
                    {
                        "name": "Interview (15 min)",
                        "color": colors.GREEN_LIGHT_1,
                    },
                ]
            }
        },
        {
            "name": "Recording Consent",
            "type": FieldType.CHECKBOX,
            "options": {
                "icon": 'check',
                "color": colors.GREEN_BRIGHT,
            }
        },
        {
            "name": "Financial Disclosure",
            "type": FieldType.CHECKBOX,
            "options": {
                "icon": 'check',
                "color": colors.GREEN_BRIGHT,
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
            "name": "Videos",
            "type": FieldType.MULTIPLE_RECORD_LINKS
        },
        {
            "name": "Course Structure",
            "type": FieldType.MULTIPLE_RECORD_LINKS
        },
        {
            "name": "Onboarding Meeting",
            "type": FieldType.DATE,
            "options": {
                "dateFormat": {
                    "name": "iso"
                }
            }
        },
        {
            "name": "Recording Prep Meeting",
            "type": FieldType.DATE,
            "options": {
                "dateFormat": {
                    "name": "iso"
                }
            }
        },
        {
            "name": "Slide Deadline",
            "type": FieldType.DATE,
            "options": {
                "dateFormat": {
                    "name": "iso"
                }
            }
        },
        {
            "name": "Recording Date",
            "type": FieldType.DATE,
            "options": {
                "dateFormat": {
                    "name": "iso"
                }
            }
        },
    ]
};
