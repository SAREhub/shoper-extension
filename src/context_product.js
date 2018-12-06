SAREhub.Contexts.Product = function (_productId, _frontApi, _sareWebApi) {
    return function() {
        var product = {
            id: _productId
        };

        _sareWebApi.productSeen(product);
    }
};