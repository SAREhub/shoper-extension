describe('SAREweb API tests', () => {
    const user = {
        userId: '10',
        email: 'test@test.pl'
    };

    const product = {
        id: 1,
        name: 'SAREhub',
        price: {
            gross: {
                final_float: '59.99'
            }
        },
        url: 'https://sarehub.com'
    };

    it('should send request when category seen', () => {
        sareX_core = jasmine.createSpyObj('SareXCore', ['execute']);

        SAREhub.SareWebApi(user).categorySeen(1);

        expect(sareX_core.execute).toHaveBeenCalledWith(1, {
            '_userId': '10',
            '_email': 'test@test.pl',
            '_category': {
                'country': 'pl',
                'language': 'pl',
                'id': 1
            }
        });
    });

    it('should send request when product seen', () => {
        sareX_core = jasmine.createSpyObj('SareXCore', ['execute']);

        SAREhub.SareWebApi(user).productSeen(product);

        expect(sareX_core.execute).toHaveBeenCalledWith(1, {
            '_userId': '10',
            '_email': 'test@test.pl',
            '_product': {
                'country': 'pl',
                'language': 'pl',
                'currency': 'pln',
                'id': 1,
                'name': 'SAREhub',
                'price': '59.99',
                'url': 'https://sarehub.com'
            }
        });
    });

    it('should send request when product added to cart', () => {
        SAREhub.SareWebApi(user).cartAddedProduct(product, 1);

        expect(sareX_params.event).toEqual({
            '_userId': '10',
            '_email': 'test@test.pl',
            '_cartadd': {
                'country': 'pl',
                'language': 'pl',
                'currency': 'pln',
                'cart_id': '',
                'product_id': 1,
                'quantity': 1,
                'name': 'SAREhub',
                'price': '59.99',
                'url': 'https://sarehub.com'
            }
        });
    });

    it('should send request when product deleted from cart', () => {
        SAREhub.SareWebApi(user).cartDeletedProduct(product, 1);

        expect(sareX_params.event).toEqual({
            '_userId': '10',
            '_email': 'test@test.pl',
            '_cartdel': {
                'country': 'pl',
                'language': 'pl',
                'currency': 'pln',
                'cart_id': '',
                'product_id': 1,
                'quantity': 1,
                'price': '59.99'
            }
        });
    });

    it('should send request when changed quantity', () => {
        SAREhub.SareWebApi(user).cartChangedQuantity(product, 1);

        expect(sareX_params.event).toEqual({
            '_userId': '10',
            '_email': 'test@test.pl',
            '_cartquantity': {
                'country': 'pl',
                'language': 'pl',
                'cart_id': '',
                'product_id': 1,
                'quantity': 1
            }
        });
    });

    it('should send request when checkout registration', () => {
        sareX_core = jasmine.createSpyObj('SareXCore', ['execute']);

        SAREhub.SareWebApi(user).cartRegistration();

        expect(sareX_core.execute).toHaveBeenCalledWith(10, {
            '_userId': '10',
            '_email': 'test@test.pl',
            '_cartregistration': {
                'cart_id': '',
            }
        });
    });

    it('should send request when checkout payment', () => {
        sareX_core = jasmine.createSpyObj('SareXCore', ['execute']);

        SAREhub.SareWebApi(user).cartPayment();

        expect(sareX_core.execute).toHaveBeenCalledWith(10, {
            '_userId': '10',
            '_email': 'test@test.pl',
            '_cartpayment': {
                'cart_id': '',
            }
        });
    });

    it('should send request when checkout delivery', () => {
        sareX_core = jasmine.createSpyObj('SareXCore', ['execute']);

        SAREhub.SareWebApi(user).cartDelivery();

        expect(sareX_core.execute).toHaveBeenCalledWith(10, {
            '_userId': '10',
            '_email': 'test@test.pl',
            '_cartdelivery': {
                'cart_id': '',
            }
        });
    });

    it('should send request when checkout summary', () => {
        sareX_core = jasmine.createSpyObj('SareXCore', ['execute']);

        SAREhub.SareWebApi(user).cartSummary();

        expect(sareX_core.execute).toHaveBeenCalledWith(10, {
            '_userId': '10',
            '_email': 'test@test.pl',
            '_cartsummary': {
                'cart_id': '',
            }
        });
    });

    it('should send request when checkout confirm', () => {
        sareX_core = jasmine.createSpyObj('SareXCore', ['execute']);

        SAREhub.SareWebApi(user).cartConfirm();

        expect(sareX_core.execute).toHaveBeenCalledWith(10, {
            '_userId': '10',
            '_email': 'test@test.pl',
            '_cartconfirm': {
                'cart_id': '',
            }
        });
    });

    it('should send request when checkout purchase', () => {
        sareX_core = jasmine.createSpyObj('SareXCore', ['execute']);

        SAREhub.SareWebApi(user).cartPurchased();

        expect(sareX_core.execute).toHaveBeenCalledWith(10, {
            '_userId': '10',
            '_email': 'test@test.pl',
            '_cartpurchased': {
                'cart_id': '',
            }
        });
    });

});