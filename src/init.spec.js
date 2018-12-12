describe('Init tests', () => {
    const sareHub = Object.assign({}, SAREhub);
    const frontApi = jasmine.createSpyObj('FrontApi', ['getLang', 'getUser', 'getBasketInfo']);
    const shop = {pageType: '', pageId: 100, values: {currency: 'pln'}};

    sareHub.SareWebApi = jasmine.createSpy('api');

    frontApi.getLang.and.returnValue('en_EN');
    frontApi.getUser.and.returnValue({user_id: '10', email: 'test@test.com'});
    frontApi.getBasketInfo.and.returnValue({products: []});

    it('when execute getUser then build user object', () => {
        shop.pageType = 'not_exist_context';

        SAREhubInit(shop, frontApi, sareHub);

        const expectedUser = {
            userId: '10',
            email: 'test@test.com',
            currency: 'pln',
            language: 'en',
            country: 'EN'
        };

        expect(sareHub.SareWebApi).toHaveBeenCalledWith(expectedUser);
    });
});