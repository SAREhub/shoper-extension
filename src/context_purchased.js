SAREhub.Contexts.Purchased = function (_sareWebApi) {
    return function init() {
        _sareWebApi.cartPurchased();
    }
};