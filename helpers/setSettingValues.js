module.exports = {
    setSettingValues: async function (setSettings, setting, values, options=false, overwrite=false) {
        if (overwrite) {
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