var SAREwebGlobals = {};

frontAPI.getCurrencies(function (currencies) {
    var i = 0;
    for (i = 0; i < currencies.list.length; i++) {
        if(currencies.list[i].currency_id == {currency_id}){
            SAREwebGlobals.currency = currencies.list[i].name;
            break;
        }
    }

    frontAPI.getLanguages(function (languages) {
        for (i = 0; i < languages.list.length; i++) {
            if(languages.list[i].lang_id == {lang_id}){
                SAREwebGlobals.lang = languages.list[i].locale;
                SAREwebGlobals.language = languages.list[i].locale.split("_")[0];
                SAREwebGlobals.country = languages.list[i].locale.split("_")[1];
                break;
            }
        }

        frontAPI.getUser(function (userInfo) {
            SAREwebGlobals.userID = 0;
            SAREwebGlobals.email = null;
            if (typeof userInfo.error_description === 'undefined') {
                SAREwebGlobals.userID = userInfo.user_id;
                SAREwebGlobals.email = userInfo.email;
            }

            var context = "{context}";
            if(context === "product_list"){
                categoryPage();
            } else if(context === "product"){
                sendProductDetails();
            } else {
                cartPages(context)
            }
            checkIfUserChanged();

            toBasketButtons = Array.from(document.querySelectorAll('form.basket,form.form-basket'));
            for (i = 0, len = toBasketButtons.length; i < len; i++) {
                toBasketButtons[i].addEventListener("submit", reloadCart, true);
            }

            function reloadCart () {
                sleep(500).then(() => {
                    compareCarts();
                });
            }

            function sleep (time) {
                return new Promise((resolve) => setTimeout(resolve, time));
            }
        });
    });
});

function checkIfUserChanged(){
    var previousUserID = parseInt(window.sessionStorage.getItem("SAREwebPreviousUserID"));
    if((previousUserID === SAREwebGlobals.userID) || (isNaN(previousUserID))){
        compareCarts();
    } else {
        if(SAREwebGlobals.userID == 0){
            removeCart();
        } else {
            var previousCart = getPreviousCart();
            for (var i = 0, len = previousCart.length; i < len; i++) {
                sendAddedItem(previousCart[i]);
                sendRemovedItem(previousCart[i], 0);
            }
            removeCart();
        }
        compareCarts();
    }
    window.sessionStorage.setItem("SAREwebPreviousUserID", SAREwebGlobals.userID);
}

function compareCarts() {
    var i = 0;
    var j = 0;
    var len = 0;
    var len2 = 0;
    var previousCart = getPreviousCart();
    frontAPI.getBasketInfo(function (basket) {
        var currentCart = [];
        for (i = 0, len = basket.products.length; i < len; i++) {
            currentCart.push({id: basket.products[i].id, product_id: basket.products[i].product_id, quantity: basket.products[i].quantity})
        }


        if(previousCart === null){
            saveCart(currentCart);
        } else {
            var addedItems = [];
            var removedItems = [];
            var changedQuantityNumbers = [];

            for (i = 0, len = previousCart.length; i < len; i++) {
                var found = false;

                for (j = 0, len2 = currentCart.length; j < len2; j++) {
                    if(previousCart[i].id === currentCart[j].id){
                        found = true;
                        if(previousCart[i].quantity !== currentCart[j].quantity){
                            changedQuantityNumbers.push(currentCart[j]);
                        }
                        break;
                    }
                }

                if(!found){
                    removedItems.push(previousCart[i]);
                }
            }

            for (i = 0, len = currentCart.length; i < len; i++) {
                found = false;

                for (j = 0, len2 = previousCart.length; j < len2; j++){
                    if(currentCart[i].id === previousCart[j].id){
                        found = true;
                        break;
                    }
                }

                if(!found){
                    addedItems.push(currentCart[i]);
                }
            }

            if((addedItems.length > 0) || (removedItems.length > 0) || (changedQuantityNumbers.length > 0)){
                sareMainCode();
                saveCart(currentCart);
                for (i = 0, len = addedItems.length; i < len; i++) {
                    sendAddedItem(addedItems[i]);
                }
                for (i = 0, len = removedItems.length; i < len; i++) {
                    sendRemovedItem(removedItems[i], SAREwebGlobals.userID);
                }
                for (i = 0, len = changedQuantityNumbers.length; i < len; i++) {
                    sendChangedQuantityItem(changedQuantityNumbers[i]);
                }
            }
        }
    });
}

function saveCart(cart) {
    window.sessionStorage.setItem("SAREwebPreviousCart", JSON.stringify(cart));
}

function getPreviousCart() {
    return JSON.parse(window.sessionStorage.getItem("SAREwebPreviousCart"));
}

function removeCart(userID) {
    window.sessionStorage.removeItem("SAREwebPreviousCart");
}

function sendAddedItem(element) {
    frontAPI.getProduct(function (product) {
        sareX_params.event = {'id': '10', 'params' : {'_userId': SAREwebGlobals.userID, '_email' : SAREwebGlobals.email, '_cartadd' : {'country' : SAREwebGlobals.country, 'language': SAREwebGlobals.language, 'cart_id' : null, 'product_id' : element.product_id, 'price' : product.price.gross.final_float, 'currency' : SAREwebGlobals.currency, 'quantity' : element.quantity, 'name' : product.name, 'url' : product.url, 'extra': {'size': false, 'color' : false}, 'category':[{'id': product.category.id}]}}};
    }, {
        lang: SAREwebGlobals.lang,
        currency: SAREwebGlobals.currency,
        id: element.product_id
    });
}

function sendRemovedItem(element, userID) {
    frontAPI.getProduct(function (product) {
        sareX_params.event = {'id': '10', 'params' : {'_userId':userID, '_email' : (userID == 0) ? null : SAREwebGlobals.email, '_cartdel' : {'country' : SAREwebGlobals.country, 'language': SAREwebGlobals.language, 'cart_id' : null, 'product_id' : element.product_id, 'price' : product.price.gross.final_float, 'currency' : SAREwebGlobals.currency, 'quantity' : element.quantity}}};
    }, {
        lang: SAREwebGlobals.lang,
        currency: SAREwebGlobals.currency,
        id: element.product_id
    });
}

function sendChangedQuantityItem(element) {
    sareX_params.event = {'id': '10', 'params' : {'_userId': SAREwebGlobals.userID, '_email' : SAREwebGlobals.email, '_cartquantity' : {'country' : SAREwebGlobals.country, 'language': SAREwebGlobals.language, 'cart_id' : null, 'product_id' : element.product_id, 'quantity' : element.quantity}}};
}

function categoryPage() {
    var catIDstring = document.getElementsByClassName("shop_product_list")[0].id;
    var index = catIDstring.search('shop_category');
    if(index >= 0){
        var catID = catIDstring.slice(13);
        sareMainCode();
        sareX_params.tag = {'_userId': SAREwebGlobals.userID, '_email': SAREwebGlobals.email, '_category':{'country' : SAREwebGlobals.country, 'language': SAREwebGlobals.language, 'id': catID}};
    }
}

function sendProductDetails() {
    var categoryList = '';
    frontAPI.getProduct(function (product) {
        var Event = document.querySelectorAll(".WebCategoryName");
        for (var i = 0, len = Event.length; i < len; i++) {
            createCategoryList(Event[i]);
        }

        function createCategoryList(currentValue) {
            categoryList += "{'id' : "+currentValue.innerHTML+"},";
        }
        categoryList = categoryList.substr(0,categoryList.length-1);
        sareMainCode();
        sareX_params.tag = ({'_userId': SAREwebGlobals.userID, '_email': SAREwebGlobals.email, '_product':{'country' : SAREwebGlobals.country, 'language': SAREwebGlobals.language, 'id': product.id, 'name': product.name, 'price' : product.price.gross.final_float, 'currency' : SAREwebGlobals.currency, 'url' : product.url, 'category':[categoryList]}});
    }, {
        lang: SAREwebGlobals.lang,
        currency: SAREwebGlobals.currency,
        id: '{product_id}'
    });
}

function cartPages (context) {
    sareMainCode();
    switch(context){
        case 'basket_address':
            context = '_cartregistration';
            break;
        case 'basket_shipping_payment':
            context = '_cartdelivery';
            break;
        case 'basket':
            context = (document.querySelectorAll('.payment-container.none').length > 0) ? false : '_cartdelivery';
            break;
        case 'basket_step3':
            context = '_cartsummary';
            break;
        case 'basket_done':
            context = '_cartconfirm';
            var input = document.querySelectorAll('button[type="submit"].important');
            if(input.length){
                input[0].addEventListener('click', function(){
                    send('_cartpayment');
                });
            }
            break;
        case 'basket_finish':
            context = '_cartpurchase';
            break;
        default:
            context = false;
            break;
    }
    if(context){
        send(context);
    }

    function send(context) {
        sareX_params.event = {'id': '10', 'params' : {'_userId': SAREwebGlobals.userID, '_email' : SAREwebGlobals.email, [context] : {'cart_id' : null}}};
    }
}

function sareMainCode () {
    var hostname = location.hostname;
    (function (p){window['sareX_params']=p;var s=document.createElement('script');
        s.src='//x.sare25.com/libs/sarex4.min.js';
        s.async=true;var t=document.getElementsByTagName('script')[0];
        t.parentNode.insertBefore(s,t);
    })({
        domain : hostname,
        ping : {'period0' : 30, 'period1' : 60},
        execute : true,
        sareX_ip : false
    });
}

