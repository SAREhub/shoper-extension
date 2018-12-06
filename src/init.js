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

        frontAPI.getUser(function (userInfo) {
            return {
                userId: userInfo.user_id || false,
                email: userInfo.email || false
            };
        });
    }

    function initContext() {
        if (!_shop.pageType) {
            setTimeout(initContext, 100);
            return;
        }

<<<<<<< HEAD
        var runner = _sareHub.ContextRunner(_shop, _sareHub.SareWebApi(getUser()), _sareHub.Contexts);
=======
        var runner = _sareHub.ContextRunner(_shop, _frontApi, _sareHub.SareWebApi, _sareHub.Contexts);
>>>>>>> 692ed87ac4475123c110ce7f5d9114d3f28a257d
        runner.dispatch();
    }

    initSAREweb();
    initContext();
})(Shop, frontAPI, SAREhub);