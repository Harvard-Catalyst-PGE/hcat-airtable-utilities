const FieldType = require('@airtable/blocks/models').FieldType;
const colors = require('@airtable/blocks/ui').colors;

module.exports = {
    "name": "Workplan",
    "apiName": "Workplan",
    "required": [
        {
            "name": "Dictionary Entry",
            "type": FieldType.FORMULA,
            "options": {
                "formula": `CONCATENATE(LEFT(Phase, 1), '.', IF({Sub Phase}, CONCATENATE(LEFT({Sub Phase}, FIND(".", {Sub Phase}) - 1), '.'), ""), LEFT({Task}, FIND(".", {Task}) - 1), ':', RIGHT({Task}, LEN({Task}) - FIND(".", {Task})))`,
            }
        },
        {
            "name": "Phase",
            "type": FieldType.SINGLE_SELECT,
            "options": {
                "choices": [
                    {
                        "name": "1. Project Opening",
                        "color": colors.TEAL_LIGHT_1,
                    },
                    {
                        "name": "2. Preparation",
                        "color": colors.BLUE_LIGHT_1,
                    },
                    {
                        "name": "3. Iterative Design (Content)",
                        "color": colors.CYAN_LIGHT_1,
                    },
                    {
                        "name": "4. Iterative Development (Course Materials)",
                        "color": colors.GREEN_LIGHT_1,
                    },
                    {
                        "name": "5. Pre-course (Rollout)",
                        "color": colors.YELLOW_LIGHT_1,
                    },
                    {
                        "name": "6. During Course",
                        "color": colors.ORANGE_LIGHT_1,
                    },
                    {
                        "name": "7. Post-course/Evaluation",
                        "color": colors.RED_LIGHT_1,
                    },
                    {
                        "name": "8. Project Closing",
                        "color": colors.PINK_LIGHT_1,
                    },
                ]
            }
        },
        {
            "name": "Sub Phase",
            "type": FieldType.SINGLE_SELECT,
            "options": {
                "choices": [
                    {
                        "name": "1. Preparation",
                        "color": colors.TEAL_LIGHT_1,
                    },
                    {
                        "name": "2. Execution",
                        "color": colors.BLUE_LIGHT_1,
                    },
                    {
                        "name": "3. Next Steps",
                        "color": colors.CYAN_LIGHT_1,
                    }
                ]
            }
        },
        {
            "name": "Task",
            "type": FieldType.SINGLE_LINE_TEXT,
        },
        {
            "name": "Owner",
            "type": FieldType.SINGLE_SELECT,
            "options": {
                "choices": [
                    {
                        "name": "eLearning Course Designer",
                        "color": colors.ORANGE_LIGHT_1,
                    },
                    {
                        "name": "Coordinator",
                        "color": colors.RED_LIGHT_1,
                    },
                    {
                        "name": "Media Producer",
                        "color": colors.PURPLE_LIGHT_1,
                    },
                    {
                        "name": "Marketing Coordinator",
                        "color": colors.GREEN_LIGHT_1,
                    },
                ]
            }
        },
        {
            "name": "Est. Effort",
            "type": FieldType.NUMBER,
            "options": {
                "precision": 0,
            }
        },
        {
            "name": "Resources Needed",
            "type": FieldType.MULTIPLE_SELECTS,
            "options": {
                "choices": [
                    {
                        "name": "eLearning Course Designer",
                        "color": colors.ORANGE_LIGHT_1,
                    },
                    {
                        "name": "Coordinator",
                        "color": colors.RED_LIGHT_1,
                    },
                    {
                        "name": "Media Producer",
                        "color": colors.PURPLE_LIGHT_1,
                    },
                    {
                        "name": "Marketing Coordinator",
                        "color": colors.GREEN_LIGHT_1,
                    },
                    {
                        "name": "Associate Director",
                        "color": colors.YELLOW_LIGHT_1,
                    },
                    {
                        "name": "Project Team",
                        "color": colors.BLUE_LIGHT_2,
                    },
                    {
                        "name": "Committee Members",
                        "color": colors.BLUE_LIGHT_2,
                    },
                    {
                        "name": "Presenters",
                        "color": colors.BLUE_LIGHT_2,
                    },
                    {
                        "name": "Curriculum Specialist",
                        "color": colors.PINK_DARK_1,
                    },
                    {
                        "name": "CME Coordinator",
                        "color": colors.GREEN_LIGHT_1,
                    },
                    {
                        "name": "Programmer",
                        "color": colors.YELLOW_LIGHT_1,
                    },
                ]
            }
        },
        {
            "name": "Other Tasks",
            "type": FieldType.RICH_TEXT,
        },
        {
            "name": "Coordinator Tasks",
            "type": FieldType.RICH_TEXT,
        },
        {
            "name": "Media Producer Tasks",
            "type": FieldType.RICH_TEXT,
        },
        {
            "name": "Designer Tasks",
            "type": FieldType.RICH_TEXT,
        },
        {
            "name": "Marketing Tasks",
            "type": FieldType.RICH_TEXT,
        },
        {
            "name": "Inputs",
            "type": FieldType.MULTIPLE_RECORD_LINKS,
            "options": {
                "linkedTableId": "Course Resources Table"
            }
        },
        {
            "name": "Task Dependencies",
            "type": FieldType.MULTIPLE_RECORD_LINKS,
            "options": {
                "linkedTableId": "Workplan Table"
            }
        },
        {
            "name": "Register",
            "type": FieldType.MULTIPLE_RECORD_LINKS,
            "options": {
                "linkedTableId": "Register Table"
            }
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
            "name": "Status",
            "type": FieldType.SINGLE_SELECT,
            "options": {
                "choices": [
                    {
                        "name": "Blocked",
                        "color": colors.RED_BRIGHT,
                    },
                    {
                        "name": "Not Started Yet",
                        "color": colors.ORANGE_BRIGHT,
                    },
                    {
                        "name": "In Progress",
                        "color": colors.YELLOW_BRIGHT,
                    },
                    {
                        "name": "Completed",
                        "color": colors.GREEN_BRIGHT,
                    },
                    {
                        "name": "N/A",
                        "color": colors.GRAY_LIGHT_1,
                    },
                ]
            }
        }
    ]
};
