describe('SAREweb API tests', () => {

    const product = {
        id: 1,
        name: "SAREhub",
        price: {
            gross: {
                final_float: '59.99'
            }
        },
        url: "https://sarehub.com"
    };

    it('should send request when category seen', () => {
        SAREhub.SareWebApi.categorySeen(1);

        expect(sareX_params.tag).toEqual({
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
        SAREhub.SareWebApi.productSeen(product);

        console.log(product);

        expect(sareX_params.tag).toEqual({
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
        SAREhub.SareWebApi.cartAddedProduct(product, 1);

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
        SAREhub.SareWebApi.cartDeletedProduct(product, 1);

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
        SAREhub.SareWebApi.cartChangedQuantity(product, 1);

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
        SAREhub.SareWebApi.cartRegistration();

        expect(sareX_params.event).toEqual({
            '_userId': '10',
            '_email': 'test@test.pl',
            '_cartregistration': {
                'cart_id': '',
            }
        });
    });

    it('should send request when checkout payment', () => {
        SAREhub.SareWebApi.cartPayment();

        expect(sareX_params.event).toEqual({
            '_userId': '10',
            '_email': 'test@test.pl',
            '_cartpayment': {
                'cart_id': '',
            }
        });
    });

    it('should send request when checkout delivery', () => {
        SAREhub.SareWebApi.cartDelivery();

        expect(sareX_params.event).toEqual({
            '_userId': '10',
            '_email': 'test@test.pl',
            '_cartdelivery': {
                'cart_id': '',
            }
        });
    });

    it('should send request when checkout summary', () => {
        SAREhub.SareWebApi.cartSummary();

        expect(sareX_params.event).toEqual({
            '_userId': '10',
            '_email': 'test@test.pl',
            '_cartsummary': {
                'cart_id': '',
            }
        });
    });

    it('should send request when checkout confirm', () => {
        SAREhub.SareWebApi.cartConfirm();

        expect(sareX_params.event).toEqual({
            '_userId': '10',
            '_email': 'test@test.pl',
            '_cartconfirm': {
                'cart_id': '',
            }
        });
    });

    it('should send request when checkout purchase', () => {
        SAREhub.SareWebApi.cartPurchased();

        expect(sareX_params.event).toEqual({
            '_userId': '10',
            '_email': 'test@test.pl',
            '_cartpurchased': {
                'cart_id': '',
            }
        });
    });

});