describe('Context tests', () => {
    it('should execute category context', () => {
        const shop = {pageType: 'shop_product_list', pageId: 10};
        const frontApi = {};
        const sareWebApi = jasmine.createSpyObj('SareWebApi', ['categorySeen']);
        const contexts = jasmine.createSpyObj('Contexts', ['Category']);

        const runner = SAREhub.ContextRunner(shop, frontApi, sareWebApi, contexts);
        runner.dispatch();

        expect(contexts.Category).toHaveBeenCalledWith(10, sareWebApi);
    });

    it('should execute product context', () => {
        const shop = {pageType: 'shop_product shop_product_from_cat_10', pageId: 100};
        const frontApi = jasmine.createSpyObj('FrontApi', ['getProduct']);
        const sareWebApi = jasmine.createSpyObj('SareWebApi', ['productSeen']);
        const contexts = jasmine.createSpyObj('Contexts', ['Product']);

        const runner = SAREhub.ContextRunner(shop, frontApi, sareWebApi, contexts);
        runner.dispatch();

        expect(contexts.Product).toHaveBeenCalledWith(100, frontApi, sareWebApi);
    });

    it('should return false when context does not exist', () => {
        const runner = SAREhub.ContextRunner({pageType: 'not_supported_type'}, {}, {});

        const result = runner.dispatch();

        expect(result).toBeFalsy();
    });
});