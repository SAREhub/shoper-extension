SAREhub.Contexts.Cart = function (_frontApi, _sareWebApi, _cartStorage) {
    function itemId(item) {
        return item.stock_id !== item.product_id ? 'stock_' + item.stock_id : item.product_id;
    }

    function createSareWebProductFromCartItem(item) {
        return {
            id: itemId(item),
            name: item.name,
            price: { gross: { final_float: item.price_float } },
            url: null
        };
    }

    function createSimpleSareWebProductFromCartItem(item) {
        return {
            id: itemId(item),
            price: { gross: { final_float: item.price_float } }
        };
    }

    function compare(newCart, oldCart) {
        for(var itemIndex in newCart.products) {
            var item = newCart.products[itemIndex];
            var oldCartItem = oldCart.find(oldCartItem => oldCartItem.id === item.id);

            if (!oldCartItem) {
                _sareWebApi.cartAddedProduct(createSareWebProductFromCartItem(item), item.quantity);
                continue;
            }

            if (oldCartItem.quantity !== item.quantity) {
                _sareWebApi.cartChangedQuantity(itemId(item), item.quantity);
            }
        }

        for(var itemIndex in oldCart) {
            var item = oldCart[itemIndex];

            if (!newCart.products.find(newCartItem => newCartItem.id === item.id)) {
                _sareWebApi.cartDeletedProduct(createSimpleSareWebProductFromCartItem(item), item.quantity);
            }
        }
    }

    // TODO interval?
    return function init() {
        var savedCart = _cartStorage.get();
        _frontApi.getBasketInfo(function (currentCart) {
            compare(currentCart, savedCart);
            _cartStorage.save(currentCart.products);
        });
    };
};