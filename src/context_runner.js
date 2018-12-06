SAREhub.ContextRunner = function (_shop, _frontApi, _sareWebApi, _contexts) {
    function dispatch() {
        var context = getContext(_shop.pageType || '');

        if (!context) {
            return false;
        }

        context();
    }

    function getContext(pageType) {
        if (pageType === 'shop_product_list') {
            return _contexts.Category(_shop.pageId || 0, _sareWebApi);
        }

        if (pageType.split(' ')[0] === 'shop_product') {
            return _contexts.Product(_shop.pageId || 0, _frontApi, _sareWebApi);
        }

        return null;
    }

    return {
        dispatch: dispatch
    };
};