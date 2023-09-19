module.exports = {
    checkFetchStatus: async function (res) {
        if (res.ok) {
            return res;
        } else {
            let message = res.statusText;

            try {
                let json = await res.json();
                
                if (json.Errors) {
                    message = json.Errors.map((error) => {
                        return error.Message;
                    });
                } else if (json.message) {
                    message = json.message;
                }
            } catch (e) {
                // Error is not JSON-formatted; do not handle
            }
            
            throw {
                status: res.status,
                statusText: message,
                message: message,
            };
        }
    }
}