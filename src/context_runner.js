SAREhub.ContextRunner = (function () {
    return function (contexts) {
        function init(context) {
            if (!context || !contexts[context]) {
                return false;
            }

            contexts[context].init();
        }

        function getContext(pageType) {
            if (pageType === 'shop_product_list') {
                return 'category';
            }

            return null;
        }

        return {
            init: init,
            getContext: getContext
        };
    };
})();