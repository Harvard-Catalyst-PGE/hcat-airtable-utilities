module.exports = {
    mergeOrders: function (cmOrders, crmOrders) {        
        // Both sources are normalized to Airtable fields, keyed on OrderId
        const crmOrdersMap = new Map(
            crmOrders.map(order => [order.OrderId, order])
        );

        return cmOrders.map((courseMerchantOrder) => {
            const crmMatch = crmOrdersMap.get(courseMerchantOrder.OrderId);
            return {
                ...crmMatch,
                ...courseMerchantOrder,
            }
        });
    }
}