(function (shop, sareHub) {
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

    function initContext(pageType) {
        var runner = sareHub.ContextRunner(sareHub.Contexts);
        runner.init(runner.getContext(pageType));
    }

    initSAREweb();
    initContext(shop.pageType || null);
})(Shop, SAREhub);