SAREhub.Contexts.Category = function (_categoryId, _sareWebApi) {
    return function init() {
        _sareWebApi.categorySeen(_categoryId);
    };
};