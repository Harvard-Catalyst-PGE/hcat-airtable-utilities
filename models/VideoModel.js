const FieldType = require('@airtable/blocks/models').FieldType;
const colors = require('@airtable/blocks/ui').colors;

module.exports = {
    "required": [
        {
            "name": "Name",
            "type": FieldType.SINGLE_LINE_TEXT,
        },
        {
            "name": "Module",
            "type": FieldType.NUMBER,
            "options": {
                "precision": 0,
            }
        },
        {
            "name": "Lecture",
            "type": FieldType.NUMBER,
            "options": {
                "precision": 0,
            }
        },
        {
            "name": "Section",
            "type": FieldType.NUMBER,
            "options": {
                "precision": 0,
            }
        },
        {
            "name": "Presenter",
            "type": FieldType.MULTIPLE_RECORD_LINKS,
        },
        {
            "name": "Filming Date",
            "type": FieldType.DATE,
            "options": {
                "dateFormat": {
                    "name": "iso"
                }
            }
        },
        {
            "name": "Edit Status",
            "type": FieldType.SINGLE_SELECT,
            "options": {
                "choices": [
                    {
                        "name": "Exclude",
                        "color": colors.GRAY_LIGHT_1,
                    },
                    {
                        "name": "Filmed",
                        "color": colors.RED_LIGHT_2,
                    },
                    {
                        "name": "Raw",
                        "color": colors.CYAN_LIGHT_2,
                    },
                    {
                        "name": "Edit",
                        "color": colors.PURPLE_LIGHT_1,
                    },
                    {
                        "name": "Rough",
                        "color": colors.ORANGE_LIGHT_2,
                    },
                    {
                        "name": "Rough (QC Complete)",
                        "color": colors.ORANGE_LIGHT_1,
                    },
                    {
                        "name": "Fine",
                        "color": colors.YELLOW_LIGHT_2,
                    },
                    {
                        "name": "Fine (QC Complete)",
                        "color": colors.YELLOW_BRIGHT,
                    },
                    {
                        "name": "Media Approved",
                        "color": colors.GREEN_LIGHT_2,
                    },
                    {
                        "name": "Approved",
                        "color": colors.GREEN_DARK_1,
                    }
                ]
            }
        },
        {
            "name": "Course Version",
            "type": FieldType.MULTIPLE_SELECTS,
            "options": {
                "choices": [
                    {
                        "name": "Version 1"
                    }
                ]
            }
        },
        {
            "name": "Editor",
            "type": FieldType.SINGLE_COLLABORATOR,
        },
        {
            "name": "Notes",
            "type": FieldType.RICH_TEXT,
        },
        {
            "name": "Additional Resources",
            "type": FieldType.RICH_TEXT,
        },
        {
            "name": "Version; date",
            "type": FieldType.SINGLE_LINE_TEXT,
        },
        {
            "name": "Runtime",
            "type": FieldType.DURATION,
            "options": {
                "durationFormat": "h:mm:ss"
            }
        },
        {
            "name": "Vimeo Review Link",
            "type": FieldType.URL,
        },
        {
            "name": "Vimeo Link",
            "type": FieldType.FORMULA,
            "options": {
                "formula": `IF({Vimeo Review Link}="", "", "https://vimeo.com/manage/videos/"&MID({Vimeo Review Link}, 42, 9))`,
            }
        },
        {
            "name": "Accessibility Review",
            "type": FieldType.CHECKBOX,
            "options": {
                "icon": "check",
                "color": "greenBright",
            }
        },
        {
            "name": "Captions",
            "type": FieldType.CHECKBOX,
            "options": {
                "icon": "check",
                "color": "greenBright",
            }
        },
        {
            "name": "Caption Review",
            "type": FieldType.CHECKBOX,
            "options": {
                "icon": "check",
                "color": "greenBright",
            }
        },
        {
            "name": "Course Structure",
            "type": FieldType.MULTIPLE_RECORD_LINKS,
        },
    ]
};
