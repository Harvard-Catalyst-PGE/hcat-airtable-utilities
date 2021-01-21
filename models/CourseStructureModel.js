const FieldType = require('@airtable/blocks/models').FieldType;
const colors = require('@airtable/blocks/ui').colors;

module.exports = {
    "required": [
        {
            "name": "D2L Page Name",
            "type": FieldType.SINGLE_LINE_TEXT,
        },
        {
            "name": "Unit",
            "type": FieldType.SINGLE_SELECT,
            "options": {
                "choices": []
            }
        },
        {
            "name": "Sub Module",
            "type": FieldType.SINGLE_SELECT,
            "options": {
                "choices": []
            }
        },
        {
            "name": "Video",
            "type": FieldType.MULTIPLE_RECORD_LINKS,
        },
        {
            "name": "Title (Header)",
            "type": FieldType.SINGLE_LINE_TEXT,
        },
        {
            "name": "Type",
            "type": FieldType.SINGLE_SELECT,
            "options": {
                "choices": [
                    {
                        "name": "Course Conclusion",
                        "color": colors.GREEN_LIGHT_1,
                    },
                    {
                        "name": "Course Overview",
                        "color": colors.PINK_LIGHT_1,
                    },
                    {
                        "name": "Discussion Board",
                        "color": colors.ORANGE_LIGHT_1,
                    },
                    {
                        "name": "Dropbox Activity",
                        "color": colors.BLUE_BRIGHT,
                    },
                    {
                        "name": "Feedback",
                        "color": colors.PURPLE_BRIGHT,
                    },
                    {
                        "name": "Meet the Course Director",
                        "color": colors.BLUE_BRIGHT,
                    },
                    {
                        "name": "Module",
                        "color": colors.YELLOW_BRIGHT,
                    },
                    {
                        "name": "PDF",
                        "color": colors.CYAN_BRIGHT,
                    },
                    {
                        "name": "Quiz",
                        "color": colors.GREEN_BRIGHT,
                    },
                    {
                        "name": "Sub Module",
                        "color": colors.PINK_BRIGHT,
                    },
                    {
                        "name": "Video",
                        "color": colors.ORANGE_BRIGHT,
                    },
                ]
            }
        },
        {
            "name": "Notes",
            "type": FieldType.RICH_TEXT,
        },
        {
            "name": "External Link",
            "type": FieldType.URL,
        },
        {
            "name": "Attachment",
            "type": FieldType.MULTIPLE_ATTACHMENTS,
        }
    ],
    "optional": [
        {
            "name": "Instructors",
            "type": FieldType.MULTIPLE_RECORD_LINKS,
        },
    ]
};
