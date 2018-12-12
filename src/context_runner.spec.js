describe('Context tests', () => {
    const frontApi = jasmine.createSpyObj('FrontApi', ['getProduct', 'getUser']);
    const sareWebApi = jasmine.createSpyObj('SareWebApi', ['productSeen', 'categorySeen']);
    const cartStorage = jasmine.createSpyObj('CartStorage', ['']);
    const contexts = jasmine.createSpyObj('Contexts', ['Category', 'Product', 'Purchased', 'Confirm',
        'DeliveryPayment', 'Registration', 'Cart']);
    contexts.Cart.and.returnValue(function() {});

    it('should execute category context', () => {
        const shop = {pageType: 'shop_product_list', pageId: 10};

        const runner = SAREhub.ContextRunner(shop, frontApi, sareWebApi, cartStorage, contexts);
        runner.dispatch();

        expect(contexts.Category).toHaveBeenCalledWith(10, sareWebApi);
    });

    it('should execute product context', () => {
        const shop = {pageType: 'shop_product shop_product_from_cat_10', pageId: 100};

        const runner = SAREhub.ContextRunner(shop, frontApi, sareWebApi, cartStorage, contexts);
        runner.dispatch();

        expect(contexts.Product).toHaveBeenCalledWith(100, frontApi, sareWebApi);
    });

    it('should execute registration context', () => {
        const shop = {pageType: 'shop_basket_address'};

        const runner = SAREhub.ContextRunner(shop, frontApi, sareWebApi, cartStorage, contexts);
        runner.dispatch();

        expect(contexts.Registration).toHaveBeenCalledWith(sareWebApi);
    });

    it('should execute delivery and payment context', () => {
        const shop = {pageType: 'shop_basket_shipping_payment'};

        const runner = SAREhub.ContextRunner(shop, frontApi, sareWebApi, cartStorage, contexts);
        runner.dispatch();

        expect(contexts.DeliveryPayment).toHaveBeenCalledWith(sareWebApi);
    });

    it('should execute confirm context', () => {
        const shop = {pageType: 'shop_basket_step3'};

        const runner = SAREhub.ContextRunner(shop, frontApi, sareWebApi, cartStorage, contexts);
        runner.dispatch();

        expect(contexts.Confirm).toHaveBeenCalledWith(sareWebApi);
    });

    it('should execute purchased context', () => {
        const shop = {pageType: 'shop_basket_done'};

        const runner = SAREhub.ContextRunner(shop, frontApi, sareWebApi, cartStorage, contexts);
        runner.dispatch();

        expect(contexts.Purchased).toHaveBeenCalledWith(sareWebApi, cartStorage);
    });

    it('should execute cart context for each context except shop_infopage', () => {
        const shop = {pageType: 'page_type'};

        const runner = SAREhub.ContextRunner(shop, frontApi, sareWebApi, cartStorage, contexts);
        runner.dispatch();

        expect(contexts.Cart).toHaveBeenCalledWith(frontApi, sareWebApi, cartStorage);
    });

    it('should return false when context does not exist', () => {
        const runner = SAREhub.ContextRunner({pageType: 'not_supported_type'}, {}, {}, {}, contexts);

        const result = runner.dispatch();

        expect(result).toBeFalsy();
    });
});