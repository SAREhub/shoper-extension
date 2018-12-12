describe('Context product tests', () => {
    describe('init', () => {
        it('should call request to SAREweb API with product details', () => {
            const frontApi = jasmine.createSpyObj('FrontApi', ['getProduct']);
            const sareWebApi = jasmine.createSpyObj('SareWebApi', ['productSeen']);
            const productContext = SAREhub.Contexts.Product(10, frontApi, sareWebApi);

            productContext();

            expect(frontApi.getProduct).toHaveBeenCalledTimes(1);
            expect(frontApi.getProduct).toHaveBeenCalledWith(sareWebApi.productSeen, { id: 10 });
        });
    });
});