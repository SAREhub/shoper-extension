describe('Context confirm tests', () => {
    describe('init', () => {
        it('should call request to SAREweb API when checkout confirm', () => {
            const sareWebApi = jasmine.createSpyObj("SareWebApi", ["cartConfirm"]);
            const confirmContext = SAREhub.Contexts.Confirm(sareWebApi);

            confirmContext();

            expect(sareWebApi.cartConfirm).toHaveBeenCalledTimes(1);
        });
    });
});