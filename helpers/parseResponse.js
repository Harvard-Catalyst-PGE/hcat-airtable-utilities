module.exports = {
    parseResponse: async function (response, resolve, reject) {
        const contentType = response.headers.get("Content-Type");

        if(!contentType) {
            // No ontent type specified; just return
            return resolve(response);
        } else if (contentType.indexOf("application/json") !== -1) {
            // Response is JSON, parse and return
            const json = await response.json();
            return resolve(json);
        } else if (contentType.startsWith("text/")) {
            // Response is text-like, parse and return
            const text = await response.text();
            return resolve(text);
        } else if (contentType.indexOf("application/octet-stream") !== -1) {
            // Response is a buffer; load data and return Reader
            let reader = response.body.getReader();
            return resolve(reader);
        } else {
            // Unknown content-type case; reject with message
            console.error("UNKNOWN RESPONSE");
            return reject(response);
        }
    }
}