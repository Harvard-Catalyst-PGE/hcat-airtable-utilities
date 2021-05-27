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
                    },
                    {
                        "name": "2. Preparation",
                    },
                    {
                        "name": "3. Iterative Design (Content)",
                    },
                    {
                        "name": "4. Iterative Development (Course Materials)",
                    },
                    {
                        "name": "5. Pre-course (Rollout)",
                    },
                    {
                        "name": "6. During Course",
                    },
                    {
                        "name": "7. Post-course/Evaluation",
                    },
                    {
                        "name": "8. Project Closing",
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
                    },
                    {
                        "name": "2. Execution",
                    },
                    {
                        "name": "3. Next Steps",
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
                    },
                    {
                        "name": "Coordinator",
                    },
                    {
                        "name": "Media Producer",
                    },
                    {
                        "name": "Marketing Coordinator",
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
                        "name": "eLearning Course Designer"
                    },
                    {
                        "name": "Coordinator"
                    },
                    {
                        "name": "Media Producer"
                    },
                    {
                        "name": "Marketing Coordinator",
                    },
                    {
                        "name": "Associate Director"
                    },
                    {
                        "name": "Project Team"
                    },
                    {
                        "name": "Committee Members"
                    },
                    {
                        "name": "Presenters"
                    },
                    {
                        "name": "Curriculum Specialist"
                    },
                    {
                        "name": "CME Coordinator"
                    },
                    {
                        "name": "Programmer"
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
        },
        {
            "name": "Task Dependencies",
            "type": FieldType.MULTIPLE_RECORD_LINKS,
        },
        {
            "name": "Register",
            "type": FieldType.MULTIPLE_RECORD_LINKS,
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
