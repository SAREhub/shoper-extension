SAREhub.Contexts.DeliveryPayment = function (_sareWebApi) {
    return function init() {
        _sareWebApi.cartDelivery();
        _sareWebApi.cartPayment();
    }
};