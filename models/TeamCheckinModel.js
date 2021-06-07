const FieldType = require('@airtable/blocks/models').FieldType;

module.exports = {
    "name": "Team Check-ins",
    "apiName": "Team Check-ins",
    "required": [
        {
            "name": "Meeting",
            "type": FieldType.DATE,
            "options": {
                "dateFormat": {
                    "name": "iso"
                }
            }
        },
        {
            "name": "Agenda",
            "type": FieldType.RICH_TEXT,
        },
        {
            "name": "Deliverables",
            "type": FieldType.RICH_TEXT,
        },
        {
            "name": "Notes",
            "type": FieldType.RICH_TEXT,
        },
    ]
};
