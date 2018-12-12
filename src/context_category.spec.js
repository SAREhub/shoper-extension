describe('Context category tests', () => {
    describe('init', () => {
        it('should call request to SAREweb API with category id', () => {
            const sareWebApi = jasmine.createSpyObj('SareWebApi', ['categorySeen']);
            const categoryContext = SAREhub.Contexts.Category(10, sareWebApi);

            categoryContext();

            expect(sareWebApi.categorySeen).toHaveBeenCalledTimes(1);
            expect(sareWebApi.categorySeen).toHaveBeenCalledWith(10);
        });
    });
});