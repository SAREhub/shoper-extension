describe('Context cart tests', () => {
    var frontApi, sareWebApi, storage = null;

    beforeEach(() => {
        frontApi = jasmine.createSpyObj('FrontApi', ['getBasketInfo']);
        sareWebApi = jasmine.createSpyObj('SareWebApi', ['cartAddedProduct', 'cartDeletedProduct', 'cartChangedQuantity']);
        storage = jasmine.createSpyObj('CartStorage', ['save', 'get']);

        frontApi.getBasketInfo.and.callFake(function(callback) {
            const currentBasketState = { products: [
                    { id: 17, stock_id: 10, product_id: 10, name: 'test-product-1', price_float: 10.10, quantity: 1 }
                ]};
            callback(currentBasketState);
        });
    });

    it ('added new product to cart which is a stock product', () => {
        frontApi.getBasketInfo.and.callFake(function(callback) {
            const currentBasketState = { products: [
                    { id: 17, stock_id: 15, product_id: 10, name: 'test-product-1', price_float: 10.10, quantity: 1 }
                ]};
            callback(currentBasketState);
        });

        storage.get.and.returnValue([]);

        const cartContext = SAREhub.Contexts.Cart(frontApi, sareWebApi, storage);
        cartContext();

        expect(sareWebApi.cartAddedProduct).toHaveBeenCalledTimes(1);
        expect(sareWebApi.cartAddedProduct).toHaveBeenCalledWith({ id: 'stock_15', name: 'test-product-1',
            price: { gross: { final_float: 10.10 } }, url: null}, 1);
    });

    it('added new product to cart which isn\'t a stock product and hasn\'t variant', () => {
        storage.get.and.returnValue([]);

        const cartContext = SAREhub.Contexts.Cart(frontApi, sareWebApi, storage);
        cartContext();

        expect(sareWebApi.cartAddedProduct).toHaveBeenCalledTimes(1);
        expect(sareWebApi.cartAddedProduct).toHaveBeenCalledWith({ id: 10, name: 'test-product-1',
            price: { gross: { final_float: 10.10 } }, url: null}, 1);
    });

    it ('added new product to cart which isn\'t a stock product and has variant', () => {
        frontApi.getBasketInfo.and.callFake(function(callback) {
            const currentBasketState = { products: [
                    { id: 17, stock_id: 10, product_id: 10, name: 'test-product-1', price_float: 10.10, quantity: 1, variant: 'product-variant' }
                ]};
            callback(currentBasketState);
        });

        storage.get.and.returnValue([]);

        const cartContext = SAREhub.Contexts.Cart(frontApi, sareWebApi, storage);
        cartContext();

        expect(sareWebApi.cartAddedProduct).toHaveBeenCalledTimes(1);
        expect(sareWebApi.cartAddedProduct).toHaveBeenCalledWith({ id: '10_product-variant', name: 'test-product-1',
            price: { gross: { final_float: 10.10 } }, url: null}, 1);
    });

    it('removed product from cart', () => {
        storage.get.and.returnValue([
            { id: 17, stock_id: 10, product_id: 10, name: 'test-product-1', price_float: 10.10, quantity: 1 },
            { id: 18, stock_id: 30, product_id: 20, name: 'test-product-2', price_float: 20.20, quantity: 2 }
        ]);

        const cartContext = SAREhub.Contexts.Cart(frontApi, sareWebApi, storage);
        cartContext();

        expect(sareWebApi.cartDeletedProduct).toHaveBeenCalledTimes(1);
        expect(sareWebApi.cartDeletedProduct).toHaveBeenCalledWith({ id: 'stock_30', price: { gross: { final_float: 20.20 } } }, 2);
    });

    it('changed quantity of product', () => {
        storage.get.and.returnValue([
            { id: 17, stock_id: 10, product_id: 10, name: 'test-product-1', price_float: 10.10, quantity: 5 }
        ]);

        const cartContext = SAREhub.Contexts.Cart(frontApi, sareWebApi, storage);
        cartContext();

        expect(sareWebApi.cartChangedQuantity).toHaveBeenCalledTimes(1);
        expect(sareWebApi.cartChangedQuantity).toHaveBeenCalledWith(10, 1);
    });

    it('init', () => {
        storage.get.and.returnValue([]);

        const cartContext = SAREhub.Contexts.Cart(frontApi, sareWebApi, storage);
        cartContext();

        expect(storage.get).toHaveBeenCalledTimes(1);

        expect(frontApi.getBasketInfo).toHaveBeenCalledTimes(1);

        expect(storage.save).toHaveBeenCalledTimes(1);
        expect(storage.save).toHaveBeenCalledWith([
            { id: 17, stock_id: 10, product_id: 10, name: 'test-product-1', price_float: 10.10, quantity: 1 }
        ]);
    });
});