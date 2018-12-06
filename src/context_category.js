SAREhub.Contexts = typeof SAREhub.Contexts === "undefined" ? {} : SAREhub.Contexts;
SAREhub.Contexts.Category = function (_categoryId, _sareWebApi) {
    function init() {
        _sareWebApi.categorySeen(_categoryId);
    }

    return {
        init: init
    };
};