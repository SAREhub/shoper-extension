describe('Context delivery tests', () => {
    describe('init', () => {
        it('should call request to SAREweb API when checkout delivery', () => {
            const sareWebApi = jasmine.createSpyObj("SareWebApi", ["cartDelivery"]);
            const deliveryContext = SAREhub.Contexts.Delivery(sareWebApi);

            deliveryContext();

            expect(sareWebApi.cartDelivery).toHaveBeenCalledTimes(1);
        });
    });
});