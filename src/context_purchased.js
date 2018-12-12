SAREhub.Contexts.Purchased = function (_sareWebApi, _cartStorage) {
    return function init() {
        _sareWebApi.cartPurchased();
        _cartStorage.clear();
    }
};