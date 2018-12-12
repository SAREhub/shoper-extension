describe('CartStorage tests', () => {
    const storage = SAREhub.CartStorage();

    describe('get', () => {
        it('given invalid JSON string then return empty array', () => {
            window.sessionStorage.setItem('sarehub_cart', 'invalid json');

            var result = storage.get();

            expect(result).toEqual([]);
        });

        it('given empty data then return empty array', () => {
            window.sessionStorage.setItem('sarehub_cart', '');

            expect(storage.get()).toEqual([]);
        });

        it('given null data then return empty array', () => {
            window.sessionStorage.setItem('sarehub_cart', 'null');

            expect(storage.get()).toEqual([]);
        });

        it('given not exist key then return empty array', () => {
            window.sessionStorage.clear();
            expect(storage.get()).toEqual([]);
        });

        it('given valid JSON then return parsed data', () => {
            window.sessionStorage.setItem('sarehub_cart', '[{"id":10, "name": "test-name"}]');

            var result = storage.get();

            expect(result).toEqual([{id: 10, name: 'test-name'}]);
        });
    });

    describe('save', () => {
        it('given data as object then save stringify data info storage', () => {
            storage.save({id: 10, name: 'test-name'});

            var result = storage.get();

            expect(result).toEqual({id: 10, name: 'test-name'});
        })
    });

    describe('clear', () => {
        it('clear all items with library prefix', () => {
            window.sessionStorage.setItem('sarehub_cart', 'item-1');
            window.sessionStorage.setItem('outside_item', 'outside-item');

            storage.clear();

            var cartItem = window.sessionStorage.getItem('sarehub_cart');
            var outsideItem = window.sessionStorage.getItem('outside_item');

            expect(cartItem).toEqual(null);
            expect(outsideItem).toEqual('outside-item');
        }) ;
    });
});