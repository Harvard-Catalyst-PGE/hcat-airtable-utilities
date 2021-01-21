const FieldType = require('@airtable/blocks/models').FieldType;

module.exports = {
    "name": "Course Resources (copy)",
    "apiName": "Course Resources",
    "required": [
        {
            "name": "Resource",
            "type": FieldType.SINGLE_LINE_TEXT,
        },
        {
            "name": "Phase created in",
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
            "name": "Notes",
            "type": FieldType.RICH_TEXT,
        },
        {
            "name": "Template (Read-only; please copy)",
            "type": FieldType.URL,
        },
        {
            "name": "Work Product (working copy)",
            "type": FieldType.URL,
        },
        {
            "name": "Inputs",
            "type": FieldType.MULTIPLE_RECORD_LINKS,
        },
        {
            "name": "Work Products",
            "type": FieldType.MULTIPLE_RECORD_LINKS,
        },
    ]
};
