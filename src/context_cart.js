SAREhub.Contexts.Cart = function (_frontApi, _sareWebApi, _cartStorage) {
    function itemId(item) {
        if (item.stock_id !== item.product_id) {
            return 'stock_' + item.stock_id;
        }

        if (item.variant) {
            return item.product_id + '_' + item.variant
        }

        return item.product_id;
    }

    function createSareWebProductFromCartItem(item) {
        return {
            id: itemId(item),
            name: item.name,
            price: {gross: {final_float: item.price_float}},
            url: null
        };
    }

    function createSimpleSareWebProductFromCartItem(item) {
        return {
            id: itemId(item),
            price: {gross: {final_float: item.price_float}}
        };
    }

    function compare(newCart, oldCart) {
        var itemIndex, item, oldCartItem;

        for (itemIndex in newCart) {
            item = newCart[itemIndex];
            oldCartItem = oldCart.find(oldCartItem => oldCartItem.id === item.id);

            if (!oldCartItem) {
                _sareWebApi.cartAddedProduct(createSareWebProductFromCartItem(item), item.quantity);
                continue;
            }

            if (oldCartItem.quantity !== item.quantity) {
                _sareWebApi.cartChangedQuantity(itemId(item), item.quantity);
            }
        }

        for (itemIndex in oldCart) {
            item = oldCart[itemIndex];

            if (!newCart.find(newCartItem => newCartItem.id === item.id)) {
                _sareWebApi.cartDeletedProduct(createSimpleSareWebProductFromCartItem(item), item.quantity);
            }
        }
    }

    return function init() {
        var savedCart = _cartStorage.get();
        _frontApi.getBasketInfo(function (currentCart) {
            compare(currentCart.products, savedCart);
            _cartStorage.save(currentCart.products);
        });
    };
};