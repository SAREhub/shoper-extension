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

    function initContext() {
        if (!_shop.pageType) {
            setTimeout(initContext, 100);
            return;
        }

        var runner = _sareHub.ContextRunner(_shop, _frontApi, _sareHub.SareWebApi, _sareHub.Contexts);
        runner.dispatch();
    }

    initSAREweb();
    initContext();
})(Shop, frontAPI, SAREhub);