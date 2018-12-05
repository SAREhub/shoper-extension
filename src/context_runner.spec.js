describe('Context tests', () => {
    describe('init', () => {
        it('should execute category context', () => {
            var category = jasmine.createSpyObj("ContextCategory", ["init"]);
            var contexts = {
                category: category
            };

            var runner = SAREhub.ContextRunner(contexts);
            runner.init(runner.getContext('shop_product_list'));

            expect(category.init).toHaveBeenCalledTimes(1);
        });

        it('should return false when context does not exist', () => {
            var runner = SAREhub.ContextRunner({category: {}});

            var result = runner.init('not_exist_context');

            expect(result).toBeFalsy();
        });
    });

    describe('getContext', () => {
        it('should return null when not supported page type', () => {
            var runner = SAREhub.ContextRunner({});

            var result = runner.getContext('not_supported_page_type');

            expect(result).toBeNull();
        });

        it('should return context name for product list', () => {
            var runner = SAREhub.ContextRunner({});

            var result = runner.getContext('shop_product_list');

            expect(result).toBe('category');
        });
    });
});