describe('Context registration tests', () => {
    describe('init', () => {
        it('should call request to SAREweb API when checkout registration', () => {
            const sareWebApi = jasmine.createSpyObj('SareWebApi', ['cartRegistration']);
            const registrationContext = SAREhub.Contexts.Registration(sareWebApi);

            registrationContext();

            expect(sareWebApi.cartRegistration).toHaveBeenCalledTimes(1);
        });
    });
});