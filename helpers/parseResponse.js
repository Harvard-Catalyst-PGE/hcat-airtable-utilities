module.exports = {
    parseResponse: async function (response, {includeMetadata = false} = {}) {
        const contentType = response.headers.get("Content-Type");

        let body;
        let bodyType;

        if(!contentType || response.status === 302 || response.status === 301) {
            // No content type specified; just return
            body = response;
            bodyType = "response";
        } else if (contentType.includes("json")) {
            // Response is JSON, parse and return
            body = await response.json();
            bodyType = "json";
        } else if (contentType.startsWith("application/") || contentType.startsWith("image/")) {
            // Response is a buffer; load data and return Reader
            body = await response.arrayBuffer();
            bodyType = "arrayBuffer";
        } else if (contentType.startsWith("text/")) {
            // Response is text-like, parse and return
            body = await response.text();
            bodyType = "text";
        } else {
            // Unknown content-type case; reject with message
            body = response;
            bodyType = "unknown";
            
            if (!includeMetadata) {
                throw new Error(response);
            }
        }

        if (!includeMetadata) {
            return body;
        }

        return {
            ok: response.ok,
            status: response.status,
            contentType,
            body,
            bodyType,
            headers: response.headers,
        }
    }
}