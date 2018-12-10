SAREhub.ContextRunner = function (_shop, _frontApi, _sareWebApi, _storage, _contexts) {
    function dispatch() {
        var context = getContext(_shop.pageType || '');

        if (context) {
            context();
        }

        if (_shop.pageType !== 'shop_infopage') {
            _contexts.Cart(_frontApi, _sareWebApi, _storage)();
        }
    }

    function getContext(pageType) {
        if (pageType === 'shop_product_list') {
            return _contexts.Category(_shop.pageId || 0, _sareWebApi);
        }

        if (pageType.split(' ')[0] === 'shop_product') {
            return _contexts.Product(_shop.pageId || 0, _frontApi, _sareWebApi);
        }

        if (pageType === 'shop_basket_address') {
            return _contexts.Registration(_sareWebApi);
        }

        if (pageType === 'shop_basket_shipping_payment') {
            return _contexts.DeliveryPayment(_sareWebApi);
        }

        if (pageType === 'shop_basket_step3') {
            return _contexts.Confirm(_sareWebApi);
        }

        if (pageType === 'shop_basket_done') {
            return _contexts.Purchased(_sareWebApi, _storage);
        }

        return null;
    }

    return {
        dispatch: dispatch
    };
};