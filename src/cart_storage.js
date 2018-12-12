SAREhub.CartStorage = function () {
    var storage = window.sessionStorage;
    var itemKey = 'sarehub_cart';

    function get() {
        try {
            var data = storage.getItem(itemKey);
            return JSON.parse(data) || [];
        } catch {
            return [];
        }
    }

    function save(data) {
        try {
            storage.setItem(itemKey, JSON.stringify(data));
        } catch {
            clear();
        }
    }

    function clear() {
        storage.removeItem(itemKey);
    }

    return {
        get: get,
        save: save,
        clear: clear
    }
};