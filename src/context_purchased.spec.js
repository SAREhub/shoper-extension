describe('Context purchased tests', () => {
    describe('init', () => {
        it('should call request to SAREweb API when checkout purchased', () => {
            const sareWebApi = jasmine.createSpyObj('SareWebApi', ['cartPurchased']);
            const storage = jasmine.createSpyObj('Storage', ['clear']);
            const purchasedContext = SAREhub.Contexts.Purchased(sareWebApi, storage);

            purchasedContext();

            expect(sareWebApi.cartPurchased).toHaveBeenCalledTimes(1);
        });
    });
});