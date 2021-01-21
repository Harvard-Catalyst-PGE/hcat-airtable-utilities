const FieldType = require('@airtable/blocks/models').FieldType;
const colors = require('@airtable/blocks/ui').colors;

module.exports = {
    "required": [
        {
            "name": "Item",
            "type": FieldType.SINGLE_LINE_TEXT,
        },
        {
            "name": "Category",
            "type": FieldType.SINGLE_SELECT,
            "options": {
                "choices": [
                    {
                        "name": "Honoraria",
                        "color": colors.PURPLE_LIGHT_1,
                    },
                    {
                        "name": "Miscellaneous",
                        "color": colors.BLUE_LIGHT_1,
                    },
                    {
                        "name": "Food",
                        "color": colors.CYAN_LIGHT_1,
                    },
                    {
                        "name": "Delivery",
                        "color": colors.GREEN_LIGHT_1,
                    },
                    {
                        "name": "Venue",
                        "color": colors.YELLOW_LIGHT_1,
                    },
                    {
                        "name": "Software",
                        "color": colors.ORANGE_LIGHT_1,
                    },
                    {
                        "name": "Video Production Equipment",
                        "color": colors.PINK_LIGHT_1,
                    },
                    {
                        "name": "Transportation",
                        "color": colors.PURPLE_LIGHT_1,
                    }
                ]
            }
        },
        {
            "name": "Expense Amount",
            "type": FieldType.CURRENCY,
            "options": {
                "precision": 2,
                "symbol": "$",
            }
        },
        {
            "name": "Pay Status",
            "type": FieldType.SINGLE_SELECT,
            "options": {
                "choices": [
                    {
                        "name": "Paid",
                        "color": colors.GREEN_BRIGHT,
                    },
                    {
                        "name": "Not processed yet",
                        "color": colors.GRAY_LIGHT_1,
                    },
                    {
                        "name": "Submitted",
                        "color": colors.PURPLE_BRIGHT,
                    }
                ]
            }
        },
        {
            "name": "Expense Notes",
            "type": FieldType.RICH_TEXT,
        }
    ]
};
