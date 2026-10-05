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
        return await this.hcat.fetchWrapper({endpoint, queryParams});
    }

    async approveOrder(orderId) {
        const endpoint = `/orders/${orderId}/approve`;
        return await this.hcat.fetchWrapper({method: "POST", endpoint})
    }
    
    async rejectOrder(orderId) {
        const endpoint = `/orders/${orderId}/reject`;
        return await this.hcat.fetchWrapper({method: "POST", endpoint})
    }

    async changeOrderStatus(orderId, orderStatus, paymentStatus) {
        let endpoint = `/orders/${orderId}`;
        const payload = {orderStatus, paymentStatus};

        return await this.hcat.fetchWrapper({method: "PATCH", endpoint, payload});
    }
    
    async getProducts() {
        let endpoint = `/products/`;

        const response = await this.hcat.fetchWrapper({endpoint});

        if (response) {
            response.sort((a, b) => a.name.localeCompare(b.name));

            let localOptions = response.map(result => ({
                value: result.id,
                label: `${result.name} (${result.id})`,
            }));
    
            return {localOptions: localOptions, rawValues: response};
        }
        
        return {localOptions: [], rawValues: []};
    }

    async getProduct(orderId) {
        const endpoint = `/products/${orderId}`;
        return await this.hcat.fetchWrapper({endpoint});
    }
    
    async createOrUpdateProduct(recordId, payload) {
        let endpoint = `/products`;

        if (payload.id) {
            endpoint += `/${payload.id}`;
        }

        const method = (payload.id) ? "PUT" : "POST";

        const response = await this.hcat.fetchWrapper({method, endpoint, payload});

        return {
            id: recordId,
            fields: {
                "Id": response.id,
                "Date Edited": response.dateEdited,
            }
        }
    }
}

module.exports = CourseMerchantApi;