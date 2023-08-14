module.exports = {
    setSettingValues: async function (setSettings, setting, values, options=false) {
        if (options) {
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