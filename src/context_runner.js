SAREhub.ContextRunner = function (_shop, _sareWebApi, _contexts) {
    function dispatch() {
        var context = getContext(_shop.pageType || '');

        if (!context) {
            return false;
        }

        context.init();
    }

    function getContext(pageType) {
        if (pageType === 'shop_product_list') {
            return _contexts.Category(_shop.pageId || 0, _sareWebApi);
        }

        return null;
    }

    return {
        dispatch: dispatch
    };
};