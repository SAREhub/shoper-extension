var SAREhub = (function () {
    function initializeSAREweb() {
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

    function getHostname() {
        return location.hostname;
    }

    initializeSAREweb();

    return {};
})();