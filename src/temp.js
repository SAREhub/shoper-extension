(function () {

    const user = {
        userId: false,
        email: false,
        currency: 'pln',
        language: 'pl',
        country: 'PL'
    };

    let getUserInfo = function () {
        frontAPI.getUser(function (userInfo) {
            if (typeof userInfo.error_description === 'undefined') {
                user.userId = userInfo.user_id;
                user.email = userInfo.email;
            }
        });
    };

    let getLanguages = function () {
        frontAPI.getLanguages(function (languages) {
            for (i = 0; i < languages.list.length; i++) {
                if (languages.list[i].lang_id == {lang_id}) {
                    user.lang = languages.list[i].locale;
                    user.language = languages.list[i].locale.split("_")[0];
                    user.country = languages.list[i].locale.split("_")[1];
                    break;
                }
            }
        });
    }

    let getCurrencies = function () {
        frontAPI.getCurrencies(function (currencies) {
            var i = 0;
            for (i = 0; i < currencies.list.length; i++) {
                if (currencies.list[i].currency_id == {currency_id}) {
                    user.currency = currencies.list[i].name;
                    break;
                }
            }
        });
    }

    let getHostname = function () {
        return location.hostname;
    };

    return {
        init: function () {

            (function (p) {
                window['sareX_params'] = p;
                var s = document.createElement('script');
                s.src = '//x.sare25.com/libs/sarex4.min.js';
                s.async = true;
                var t = document.getElementsByTagName('script')[0];
                t.parentNode.insertBefore(s, t);
            })({
                domain: getHostname()
            });
        }
    }
}()).init();