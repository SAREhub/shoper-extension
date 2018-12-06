describe('Context tests', () => {
    describe('dispatch', () => {
        it('should execute category context', () => {
            const shop = { pageType: 'shop_product_list', pageId: 10 };
            const sareWebApi = jasmine.createSpyObj("SareWebApi", ["categorySeen"]);
            const category = jasmine.createSpyObj("ContextCategory", ["init"]);
            const contexts = jasmine.createSpyObj("Contexts", ["Category"]);
            contexts.Category.and.returnValue(category);

            const runner = SAREhub.ContextRunner(shop, sareWebApi, contexts);
            runner.dispatch();

            expect(contexts.Category).toHaveBeenCalledWith(10, sareWebApi);
            expect(category.init).toHaveBeenCalledTimes(1);
        });

        it('should return false when context does not exist', () => {
            const runner = SAREhub.ContextRunner({pageType: 'not_supported_type'}, {}, {});

            const result = runner.dispatch();

            expect(result).toBeFalsy();
        });
    });
});