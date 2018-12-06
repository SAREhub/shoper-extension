SAREhub.Contexts.Product = function (_productId, _frontApi, _sareWebApi) {
    return function init() {
        _frontApi.getProduct(_sareWebApi.productSeen, { id: _productId});
    }
};