const FieldType = require('@airtable/blocks/models').FieldType;
const colors = require('@airtable/blocks/ui').colors;

module.exports = {
    "name": "Dictionary (copy)",
    "apiName": "Dictionary",
    "required": [
        {
            "name": "Dictionary Entry",
            "type": FieldType.FORMULA,
            "options": {
                "formula": `CONCATENATE(LEFT(Phase, 1), '.', LEFT({Sub Phase}, 1), '.', LEFT(Task, 1), ':', RIGHT(Task, LEN(Task) - 2))`,
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
                        "name": "3. Iterative Design",
                    },
                    {
                        "name": "4. Iterative Development",
                    },
                    {
                        "name": "5. Rollout",
                    },
                    {
                        "name": "6. Evaluation and Revision",
                    },
                    {
                        "name": "7. Project Closing",
                    }
                ]
            }
        },
        {
            "name": "Sub Phase",
            "type": FieldType.SINGLE_LINE_TEXT,
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
                        "name": "Project Manager",
                    },
                    {
                        "name": "eLearning Course Designer",
                    },
                    {
                        "name": "Coordinator",
                    },
                    {
                        "name": "eLearning Instructional Designer",
                    },
                    {
                        "name": "Media Producer",
                    }
                ]
            }
        },
        // {
        //     "name": "Template creation status",
        //     "type": FieldType.SINGLE_SELECT,
        // },
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
                        "name": "Project Sponsor"
                    },
                    {
                        "name": "Coordinator"
                    },
                    {
                        "name": "Project Team"
                    },
                    {
                        "name": "Project Stakeholders"
                    },
                    {
                        "name": "Committee Members"
                    },
                    {
                        "name": "Presenters"
                    },
                    {
                        "name": "Media Producer"
                    },
                    {
                        "name": "Curriculum Specialist"
                    },
                    {
                        "name": "Faculty Committee Members"
                    },
                    {
                        "name": "CME Coordinator"
                    },
                    {
                        "name": "eLearning Course Designer"
                    },
                    {
                        "name": "Programmer"
                    },
                ]
            }
        },
        {
            "name": "Description of Task (Work required)",
            "type": FieldType.RICH_TEXT,
        },
        {
            "name": "Inputs",
            "type": FieldType.MULTIPLE_RECORD_LINKS,
        },
        {
            "name": "Outputs",
            "type": FieldType.MULTIPLE_RECORD_LINKS,
        },
        {
            "name": "Task Dependencies",
            "type": FieldType.MULTIPLE_RECORD_LINKS,
        },
        {
            "name": "Risks",
            "type": FieldType.SINGLE_LINE_TEXT,
        },
        {
            "name": "Registers",
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
                        "name": "Open",
                        "color": colors.RED_BRIGHT,
                    },
                    {
                        "name": "In Progress",
                        "color": colors.ORANGE_BRIGHT,
                    },
                    {
                        "name": "Blocked",
                        "color": colors.YELLOW_BRIGHT,
                    },
                    {
                        "name": "Completed",
                        "color": colors.GREEN_BRIGHT,
                    },
                    {
                        "name": "Completed (Late)",
                        "color": colors.GREEN_LIGHT_1,
                    },
                    {
                        "name": "Cancelled",
                        "color": colors.GRAY_LIGHT_1,
                    },
                    {
                        "name": "Delayed",
                        "color": colors.GRAY_LIGHT_1,
                    },
                    {
                        "name": "Deferred",
                        "color": colors.GRAY_LIGHT_1,
                    },
                    {
                        "name": "Omitted",
                        "color": colors.GRAY_BRIGHT,
                    },
                ]
            }
        }
    ]
};
