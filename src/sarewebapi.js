SAREhub.SareWebApi = (function () {
    var sareWebLoadEvent = 1;
    var basicInfo = {
        'userId': '10',
        'email': 'test@test.pl',
        'country': 'pl',
        'language': 'pl',
        'currency': 'pln',
    };

    function categorySeen(categoryId) {
        var params = {
            '_userId': basicInfo.userId,
            '_email': basicInfo.email,
            '_category': {
                'country': basicInfo.country,
                'language': basicInfo.language,
                'id': categoryId
            }
        };
        sareX_core.execute(sareWebLoadEvent, params);
    }

    function productSeen(product) {
        var params = {
            '_userId': basicInfo.userId,
            '_email': basicInfo.email,
            '_product': {
                'country': basicInfo.country,
                'language': basicInfo.language,
                'currency': basicInfo.currency,
                'id': product.id,
                'name': product.name,
                'price': product.price.gross.final_float,
                'url': product.url
            }
        };
        sareX_core.execute(sareWebLoadEvent, params);
    }

    function cartAddedProduct(productInfo, quantity) {
        sareX_params.event = {
            '_userId': basicInfo.userId,
            '_email': basicInfo.email,
            '_cartadd': {
                'country': basicInfo.country,
                'language': basicInfo.language,
                'currency': basicInfo.currency,
                'cart_id': '',
                'product_id': productInfo.id,
                'name': productInfo.name,
                'price': productInfo.price.gross.final_float,
                'url': productInfo.url,
                'quantity': quantity,
            }
        };
    }

    function cartDeletedProduct(productInfo, quantity) {
        sareX_params.event = {
            '_userId': basicInfo.userId,
            '_email': basicInfo.email,
            '_cartdel': {
                'country': basicInfo.country,
                'language': basicInfo.language,
                'currency': basicInfo.currency,
                'cart_id': '',
                'product_id': productInfo.id,
                'price': productInfo.price.gross.final_float,
                'quantity': quantity,
            }
        };
    }

    function cartChangedQuantity(productInfo, quantity) {
        sareX_params.event = {
            '_userId': basicInfo.userId,
            '_email': basicInfo.email,
            '_cartquantity': {
                'country': basicInfo.country,
                'language': basicInfo.language,
                'cart_id': '',
                'product_id': productInfo.id,
                'quantity': quantity
            }
        };
    }

    function cartRegistration() {
        sareX_params.event = {
            '_userId': basicInfo.userId,
            '_email': basicInfo.email,
            '_cartregistration': {
                'cart_id': ''
            }
        };
    }

    function cartPayment() {
        sareX_params.event = {
            '_userId': basicInfo.userId,
            '_email': basicInfo.email,
            '_cartpayment': {
                'cart_id': ''
            }
        };
    }

    function cartDelivery() {
        sareX_params.event = {
            '_userId': basicInfo.userId,
            '_email': basicInfo.email,
            '_cartdelivery': {
                'cart_id': ''
            }
        };
    }

    function cartSummary() {
        sareX_params.event = {
            '_userId': basicInfo.userId,
            '_email': basicInfo.email,
            '_cartsummary': {
                'cart_id': ''
            }
        };
    }

    function cartConfirm() {
        sareX_params.event = {
            '_userId': basicInfo.userId,
            '_email': basicInfo.email,
            '_cartconfirm': {
                'cart_id': ''
            }
        };
    }

    function cartPurchased() {
        sareX_params.event = {
            '_userId': basicInfo.userId,
            '_email': basicInfo.email,
            '_cartpurchased': {
                'cart_id': ''
            }
        };
    }

    return {
        categorySeen: categorySeen,
        productSeen: productSeen,
        cartAddedProduct: cartAddedProduct,
        cartDeletedProduct: cartDeletedProduct,
        cartChangedQuantity: cartChangedQuantity,
        cartRegistration: cartRegistration,
        cartPayment: cartPayment,
        cartDelivery: cartDelivery,
        cartSummary: cartSummary,
        cartConfirm: cartConfirm,
        cartPurchased: cartPurchased
    };
})();