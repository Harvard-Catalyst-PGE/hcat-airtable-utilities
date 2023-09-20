module.exports = {
    setSettingValues: async function (setSettings, setting, values, options=false, overwrite=false, advanced=false) {
        if (advanced) {
            setSettings(prevState => ({
                ...prevState,
                "advancedConfig": {
                    ...prevState["advancedConfig"],
                    [setting]: {
                        ...prevState["advancedConfig"][setting],
                        ...values
                    }
                }
            }))
        } else if (options && overwrite) {
            setSettings(prevState => ({
                ...prevState,
                [setting]: {
                    ...prevState[setting],
                    "options": [
                        {"value": "", "label": ""},
                        ...values
                    ]
                }
            }));
        } else if (options) {
            setSettings(prevState => ({
                ...prevState,
                [setting]: {
                    ...prevState[setting],
                    "options": [
                        ...prevState[setting].options,
                        ...values
                    ]
                }
            }));
        } else if (overwrite) {
            setSettings(prevState => ({
                ...prevState,
                [setting]: values
            }));
        } else {
            setSettings(prevState => ({
                ...prevState,
                [setting]: {
                    ...prevState[setting],
                    ...values
                }
            }));
        }
    }
}