'use strict';

class CourseMerchantApi {
    constructor(hcat) {
        this.hcat = hcat;
    }

    /*--------------------------------------------------------------
    # Course Merchant
    --------------------------------------------------------------*/
    async getOrders(queryParams = {}) {
        let endpoint = `/orders`
        return await this.hcat.fetchWrapper({endpoint: endpoint, queryParams});
    }

    async approveOrder(orderId, queryParams = {}) {
        const endpoint = `/orders/${orderId}/approve`;
        return await this.hcat.fetchWrapper({method: "POST", endpoint: endpoint, queryParams});
    }
    
    async rejectOrder(orderId, queryParams = {}) {
        const endpoint = `/orders/${orderId}`;
        return await this.hcat.fetchWrapper({method: "PATCH", endpoint: endpoint, queryParams});
    }
}

module.exports = CourseMerchantApi;