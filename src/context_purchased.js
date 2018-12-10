SAREhub.Contexts.Purchased = function (_sareWebApi, _storage) {
    return function init() {
        _sareWebApi.cartPurchased();
        _storage.clearAll();
    }
};