export function getQuery(queryParams = {}) {
    let query = "";

    if (Object.keys(queryParams).length > 0) {
        query += "?";

        for (const [key, value] of Object.entries(queryParams)) {
            query += `${key}=${value}&`;
        }
    }

    return query;
}