describe('Context cart tests', () => {
    const frontApi = jasmine.createSpyObj('FrontApi', ['getBasketInfo']);
    const sareWebApi = jasmine.createSpyObj('SareWebApi', ['cartAddedProduct', 'cartDeletedProduct', 'cartChangedQuantity']);
    frontApi.getBasketInfo.and.callFake(function(callback) {
        const currentBasketState = { products: [
            { id: 17, product_id: 10, name: 'test-product-1', price_float: 10.10, quantity: 1 }
        ]};
        callback(currentBasketState);
    });

    function setCartState(state) {
        window.sessionStorage.setItem('sarehub_cart', JSON.stringify(state || []));
    }

    it('added new product to cart', () => {
        setCartState([]);

        const cartContext = SAREhub.Contexts.Cart(frontApi, sareWebApi);
        cartContext();

        const expectedProduct = {
            id: 10,
            name: 'test-product-1',
            price: { gross: { final_float: 10.10 } },
            url: null
        };

        expect(sareWebApi.cartAddedProduct).toHaveBeenCalledTimes(1);
        expect(sareWebApi.cartAddedProduct).toHaveBeenCalledWith(expectedProduct, 1);
    });

    it('removed product from cart', () => {
        setCartState([
            { id: 17, product_id: 10, name: 'test-product-1', price_float: 10.10, quantity: 1 },
            { id: 18, product_id: 20, name: 'test-product-2', price_float: 20.20, quantity: 2 }
        ]);

        const cartContext = SAREhub.Contexts.Cart(frontApi, sareWebApi);
        cartContext();

        const expectedProduct = {
            id: 20,
            price: { gross: { final_float: 20.20 } }
        };

        expect(sareWebApi.cartDeletedProduct).toHaveBeenCalledTimes(1);
        expect(sareWebApi.cartDeletedProduct).toHaveBeenCalledWith(expectedProduct, 2);
    });

    it('changed quantity of product', () => {
        setCartState([
            { id: 17, product_id: 10, name: 'test-product-1', price_float: 10.10, quantity: 5 }
        ]);

        const cartContext = SAREhub.Contexts.Cart(frontApi, sareWebApi);
        cartContext();

        expect(sareWebApi.cartChangedQuantity).toHaveBeenCalledTimes(1);
        expect(sareWebApi.cartChangedQuantity).toHaveBeenCalledWith(10, 1);
    });
});