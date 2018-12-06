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
        const userInfo = frontAPI.getUser();
        return {
            userId: userInfo.user_id || false,
            email: userInfo.email || false
        };
    }

    function initContext() {
        if (!_shop.pageType || typeof sareX_params === 'undefined' || typeof sareX_core === 'undefined') {
            setTimeout(initContext, 100);
            return;
        }

        var runner = _sareHub.ContextRunner(_shop, _frontApi, _sareHub.SareWebApi(getUser()), _sareHub.Contexts);
        runner.dispatch();
    }

    initSAREweb();
    initContext();
})(Shop, frontAPI, SAREhub);