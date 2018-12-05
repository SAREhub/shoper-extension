SAREhub.SareWebApi = (function () {
    var basicInfo = {
        'userId': '10',
        'email': 'test@test.pl',
        'country': 'pl',
        'language': 'pl',
        'product_id': 10,
        'quantity': 1,
        'name': 'SAREhub',
        'price': '59.99',
        'currency': 'pln',
        'url': 'https://sarehub.com'
    };

    function categorySeen(categoryId) {
        sareX_params.tag = {
            '_userId': basicInfo.userId,
            '_email': basicInfo.email,
            '_category': {
                'country': basicInfo.country,
                'language': basicInfo.language,
                'id': categoryId
            }
        };
    }

    function productSeen(productId) {
        sareX_params.tag = {
            '_userId': basicInfo.userId,
            '_email': basicInfo.email,
            '_product': {
                'country': basicInfo.country,
                'language': basicInfo.language,
                'id': productId,
                'name': basicInfo.name,
                'price': basicInfo.price,
                'currency': basicInfo.currency,
                'url': basicInfo.url
            }
        };
    }

    function cartAddedProduct(productId) {
        sareX_params.event = {
            '_userId': basicInfo.userId,
            '_email': basicInfo.email,
            '_cartadd': {
                'country': basicInfo.country,
                'language': basicInfo.language,
                'cart_id': '',
                'product_id': productId,
                'quantity': basicInfo.quantity,
                'name': basicInfo.name,
                'price': basicInfo.price,
                'currency': basicInfo.currency,
                'url': basicInfo.url
            }
        };
    }

    function cartDeletedProduct(productId) {
        sareX_params.event = {
            '_userId': basicInfo.userId,
            '_email': basicInfo.email,
            '_cartdel': {
                'country': basicInfo.country,
                'language': basicInfo.language,
                'cart_id': '',
                'product_id': productId,
                'quantity': basicInfo.quantity,
                'price': basicInfo.price,
                'currency': basicInfo.currency,
            }
        };
    }

    function cartChangedQuantity(productId) {
        sareX_params.event = {
            '_userId': basicInfo.userId,
            '_email': basicInfo.email,
            '_cartquantity': {
                'country': basicInfo.country,
                'language': basicInfo.language,
                'cart_id': '',
                'product_id': productId,
                'quantity': basicInfo.quantity
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