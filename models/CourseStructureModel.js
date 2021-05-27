const FieldType = require('@airtable/blocks/models').FieldType;
const colors = require('@airtable/blocks/ui').colors;

module.exports = {
    "required": [
        {
            "name": "D2L Page Name",
            "type": FieldType.SINGLE_LINE_TEXT,
        },
        {
            "name": "Id",
            "type": FieldType.NUMBER,
            "options": {
                "precision": 0,
            }
        },
        {
            "name": "Module",
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
                        "name": "Module",
                        "color": colors.YELLOW_BRIGHT,
                    },
                    {
                        "name": "Sub Module",
                        "color": colors.PINK_BRIGHT,
                    },
                    {
                        "name": "Course Overview",
                        "color": colors.PINK_LIGHT_1,
                    },
                    {
                        "name": "Meet the Presenter",
                        "color": colors.BLUE_BRIGHT,
                    },
                    {
                        "name": "Syllabus",
                        "color": colors.BLUE_BRIGHT,
                    },
                    {
                        "name": "Password Change",
                        "color": colors.BLUE_BRIGHT,
                    },
                    {
                        "name": "Video",
                        "color": colors.ORANGE_BRIGHT,
                    },
                    {
                        "name": "Course Conclusion",
                        "color": colors.GREEN_LIGHT_1,
                    },
                    {
                        "name": "Discussion Board",
                        "color": colors.ORANGE_LIGHT_1,
                    },
                    {
                        "name": "Discussion Topic",
                        "color": colors.ORANGE_LIGHT_1,
                    },
                    {
                        "name": "Dropbox Activity",
                        "color": colors.BLUE_BRIGHT,
                    },
                    {
                        "name": "Link",
                        "color": colors.PURPLE_BRIGHT,
                    },
                    {
                        "name": "File",
                        "color": colors.CYAN_BRIGHT,
                    },
                    {
                        "name": "Quiz",
                        "color": colors.GREEN_BRIGHT,
                    },   
                ]
            }
        },
        {
            "name": "Module Description",
            "type": FieldType.RICH_TEXT,
        },
        {
            "name": "External Link",
            "type": FieldType.URL,
        },
        {
            "name": "Attachment",
            "type": FieldType.MULTIPLE_ATTACHMENTS,
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
    ],
    "optional": [
        {
            "name": "Presenters",
            "type": FieldType.MULTIPLE_RECORD_LINKS,
        },
    ]
};
