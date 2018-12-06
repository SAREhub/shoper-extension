var SAREwebGlobals = {
    userId: false,
    email: false,
    currency: 'pln',
    language: 'pl',
    country: 'PL'
};


// Zwacanie produktu na karcie produktu
{product_id}

//lub id produktu i kateogrii
console.log(Shop.pageId);



// Szczególy kateogrii
frontAPI.getCategory(function (category) {
    console.log(category);
}, {
    id: Shop.pageId
});

// lub sync
frontAPI.getCategory({id: Shop.pageId});


// Szczególy produkty
var productId = frontAPI.getProduct(Shop.pageId);



// Moze zostać:

function mainCode () {
    var hostname = location.hostname;
    (function (p){window['sareX_params']=p;var s=document.createElement('script');
        s.src='//x.sare25.com/libs/sarex4.min.js';
        s.async=true;var t=document.getElementsByTagName('script')[0];
        t.parentNode.insertBefore(s,t);
    })({
        domain : hostname,
        ping : {'period0' : 30, 'period1' : 60}
    });
}

//{currency_id} za będzie podstawiony id np. 2
frontAPI.getCurrencies(function (currencies) {
    var i = 0;
    for (i = 0; i < currencies.list.length; i++) {
        if(currencies.list[i].currency_id == {currency_id}){
            SAREwebGlobals.currency = currencies.list[i].name;
            break;
        }
    }
});

//{lang_id} za będzie podstawiony id np. 1
frontAPI.getLanguages(function (languages) {
    for (i = 0; i < languages.list.length; i++) {
        if(languages.list[i].lang_id == {lang_id}){
            SAREwebGlobals.lang = languages.list[i].locale;
            SAREwebGlobals.language = languages.list[i].locale.split("_")[0];
            SAREwebGlobals.country = languages.list[i].locale.split("_")[1];
            break;
        }
    }
});

//dodatkowo obsłużyć error_description Unauthorized?
// sprawdzić jak się zachowuje gdy użītkownik jest zalogowany
frontAPI.getUser(function (userInfo) {
    if (typeof userInfo.error_description === 'undefined') {
        SAREwebGlobals.userId = userInfo.user_id;
        SAREwebGlobals.email = userInfo.email;
    }
});

