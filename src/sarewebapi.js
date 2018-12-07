SAREhub.SareWebApi = function (_user) {
    var sareWebLoadEvent = 1;
    var sareWebCartEvent = 10;
    var basicInfo = {
        'country': 'pl',
        'language': 'pl',
        'currency': 'pln',
    };

    function categorySeen(categoryId) {
        var params = {
            '_userId': _user.userId,
            '_email': _user.email,
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
            '_userId': _user.userId,
            '_email': _user.email,
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
            '_userId': _user.userId,
            '_email': _user.email,
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
            '_userId': _user.userId,
            '_email': _user.email,
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
            '_userId': _user.userId,
            '_email': _user.email,
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
        var params = {
            '_userId': _user.userId,
            '_email': _user.email,
            '_cartregistration': {
                'cart_id': ''
            }
        };

        sareX_core.execute(sareWebCartEvent, params);
    }

    function cartPayment() {
         var params = {
            '_userId': _user.userId,
            '_email': _user.email,
            '_cartpayment': {
                'cart_id': ''
            }
        };

        sareX_core.execute(sareWebCartEvent, params);
    }

    function cartDelivery() {
        var params = {
            '_userId': _user.userId,
            '_email': _user.email,
            '_cartdelivery': {
                'cart_id': ''
            }
        };

        sareX_core.execute(sareWebCartEvent, params);
    }

    function cartSummary() {
        var params = {
            '_userId': _user.userId,
            '_email': _user.email,
            '_cartsummary': {
                'cart_id': ''
            }
        };

        sareX_core.execute(sareWebCartEvent, params);
    }

    function cartConfirm() {
        var params = {
            '_userId': _user.userId,
            '_email': _user.email,
            '_cartconfirm': {
                'cart_id': ''
            }
        };

        sareX_core.execute(sareWebCartEvent, params);
    }

    function cartPurchased() {
        var params = {
            '_userId': _user.userId,
            '_email': _user.email,
            '_cartpurchased': {
                'cart_id': ''
            }
        };

        sareX_core.execute(sareWebCartEvent, params);
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
};