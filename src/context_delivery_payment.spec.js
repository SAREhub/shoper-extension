describe('Context delivery and payment tests', () => {
    describe('init', () => {
        it('should call two requests to SAREweb API when delivery and payment', () => {
            const sareWebApi = jasmine.createSpyObj('SareWebApi', ['cartDelivery', 'cartPayment']);
            const deliveryPaymentContext = SAREhub.Contexts.DeliveryPayment(sareWebApi);

            deliveryPaymentContext();

            expect(sareWebApi.cartDelivery).toHaveBeenCalledTimes(1);
            expect(sareWebApi.cartPayment).toHaveBeenCalledTimes(1);
        });
    });
});