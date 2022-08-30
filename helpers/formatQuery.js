module.exports = {
    formatQuery: function (queryParams = {}) {
        let query = "";
    
        if (Object.keys(queryParams).length > 0) {
            query += "?";
    
            for (const [key, value] of Object.entries(queryParams)) {
                if (!value) {
                    continue;
                }
                
                query += `${key}=${value}&`;
            }
        }
    
        return query;
    }
}