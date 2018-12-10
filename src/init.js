(function (_shop, _frontApi, _sareHub) {
    function initSAREweb() {
        (function (p) {
            window['sareX_params'] = p;
            var s = document.createElement('script');
            s.src = '//x.sare25.com/libs/sarex4.min.js';
            s.async = true;
            var t = document.getElementsByTagName('script')[0];
            t.parentNode.insertBefore(s, t);
        })({
            domain: location.hostname
        });
    }

    function getUser() {
        var userInfo = _frontAPI.getUser();
        var langInfo = _frontAPI.getLang();

        return {
            userId: userInfo.user_id || false,
            email: userInfo.email || false,
            currency: _shop.values.currency || 'pln',
            language: langInfo.split('_')[0] || 'pl',
            country: langInfo.split('_')[1] || 'PL'
        };
    }

    function initContext() {
        if (!_shop.pageType || typeof sareX_params === 'undefined' || typeof sareX_core === 'undefined') {
            setTimeout(initContext, 100);
            return;
        }

        var runner = _sareHub.ContextRunner(_shop, _frontApi, _sareHub.SareWebApi(getUser()), _sareHub.Storage(), _sareHub.Contexts);
        runner.dispatch();
    }

    initSAREweb();
    initContext();
})(Shop, frontAPI, SAREhub);