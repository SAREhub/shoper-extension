describe('SAREweb API tests', () => {
    it('should send request when category seen', () => {
        SAREhub.SareWebApi.categorySeen(10);

        expect(sareX_params.tag).toEqual({
            '_userId': '10',
            '_email': 'test@test.pl',
            '_category': {
                'country': 'pl',
                'language': 'pl',
                'id': 10
            }
        });
    });
});