describe('Context product tests', () => {
    describe('init', () => {
        it('should call request to SAREweb API with product details', () => {
            const product = { id: 10 };
            const frontApi = jasmine.createSpyObj("FrontApi", ["getProduct"]);
            const sareWebApi = jasmine.createSpyObj("SareWebApi", ["productSeen"]);
            const productCotext = SAREhub.Contexts.Product(10, frontApi, sareWebApi);

            productCotext();

            expect(sareWebApi.productSeen).toHaveBeenCalledTimes(1);
            expect(sareWebApi.productSeen).toHaveBeenCalledWith(product);
        });
    });
});