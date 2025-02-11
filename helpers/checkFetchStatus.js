module.exports = {
    checkFetchStatus: async function (res) {
        if (res.ok || res.status === 302 || res.status === 308) {
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
                } else if (json.Message) {
                    message = json.Message;
                } else if (json.detail) {
                    message = json.detail;
                } else if (json.error) {
                    message = `${json.error.type}-${json.error.message}`;
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