SAREhub.Contexts.Registration = function (_sareWebApi) {
    return function init() {
        _sareWebApi.checkoutInitialized();
        _sareWebApi.cartRegistration();
    }
};