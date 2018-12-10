describe('Context tests', () => {
    const frontApi = jasmine.createSpyObj('FrontApi', ['getProduct', 'getUser']);
    const sareWebApi = jasmine.createSpyObj('FrontApi', ['productSeen', 'categorySeen']);
    const contexts = jasmine.createSpyObj('Contexts', ['Category', 'Product', 'Purchased', 'Confirm',
        'DeliveryPayment', 'Registration', 'Cart']);

    it('should execute category context', () => {
        const shop = {pageType: 'shop_product_list', pageId: 10};

        const runner = SAREhub.ContextRunner(shop, frontApi, sareWebApi, contexts);
        runner.dispatch();

        expect(contexts.Category).toHaveBeenCalledWith(10, sareWebApi);
    });

    it('should execute product context', () => {
        const shop = {pageType: 'shop_product shop_product_from_cat_10', pageId: 100};

        const runner = SAREhub.ContextRunner(shop, frontApi, sareWebApi, contexts);
        runner.dispatch();

        expect(contexts.Product).toHaveBeenCalledWith(100, frontApi, sareWebApi);
    });

    it('should execute registration context', () => {
        const shop = {pageType: 'shop_basket_address'};

        const runner = SAREhub.ContextRunner(shop, frontApi, sareWebApi, contexts);
        runner.dispatch();

        expect(contexts.Registration).toHaveBeenCalledWith(sareWebApi);
    });

    it('should execute delivery and payment context', () => {
        const shop = {pageType: 'shop_basket_shipping_payment'};

        const runner = SAREhub.ContextRunner(shop, frontApi, sareWebApi, contexts);
        runner.dispatch();

        expect(contexts.DeliveryPayment).toHaveBeenCalledWith(sareWebApi);
    });

    it('should execute confirm context', () => {
        const shop = {pageType: 'shop_basket_step3'};

        const runner = SAREhub.ContextRunner(shop, frontApi, sareWebApi, contexts);
        runner.dispatch();

        expect(contexts.Confirm).toHaveBeenCalledWith(sareWebApi);
    });

    it('should execute purchased context', () => {
        const shop = {pageType: 'shop_basket_done'};

        const runner = SAREhub.ContextRunner(shop, frontApi, sareWebApi, contexts);
        runner.dispatch();

        expect(contexts.Purchased).toHaveBeenCalledWith(sareWebApi);
    });

    it('should return false when context does not exist', () => {
        const runner = SAREhub.ContextRunner({pageType: 'not_supported_type'}, {}, {}, contexts);

        const result = runner.dispatch();

        expect(result).toBeFalsy();
    });
});