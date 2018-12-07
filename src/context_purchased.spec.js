describe('Context purchased tests', () => {
    describe('init', () => {
        it('should call request to SAREweb API when checkout purchased', () => {
            const sareWebApi = jasmine.createSpyObj("SareWebApi", ["cartPurchased"]);
            const purchasedContext = SAREhub.Contexts.Purchased(sareWebApi);

            purchasedContext();

            expect(sareWebApi.cartPurchased).toHaveBeenCalledTimes(1);
        });
    });
});