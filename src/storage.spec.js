describe('Storage tests', () => {
    const storage = SAREhub.Storage();

    describe('getItem', () => {
        it('given invalid JSON string then return empty array', () => {
            window.sessionStorage.setItem('sh_getItem_empty', 'invalid json');

            var result = storage.getItem('sh_getItem_empty');

            expect(result).toEqual([]);
        });

        it('given empty or null data then return empty array', () => {
            window.sessionStorage.setItem('sh_getItem_empty', '');
            window.sessionStorage.setItem('sh_getItem_null', 'null');

            expect(storage.getItem('sh_getItem_empty')).toEqual([]);
            expect(storage.getItem('sh_getItem_null')).toEqual([]);
        });

        it('given not exist key then return empty array', () => {
            expect(storage.getItem('sh_getItem_not_exists')).toEqual([]);
        });

        it('given valid JSON then return parsed data', () => {
            window.sessionStorage.setItem('sh_getItem_correct', '[{"id":10, "name": "test-name"}]');

            var result = storage.getItem('sh_getItem_correct');

            expect(result).toEqual([{id: 10, name: 'test-name'}]);
        });
    });
});