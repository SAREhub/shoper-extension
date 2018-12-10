SAREhub.Storage = function () {
    var storage = window.sessionStorage;

    function getItem(key) {
        try {
            var data = storage.getItem(key);
            return JSON.parse(data) || [];
        } catch {
            return [];
        }
    }

    function saveItem(key, data) {
        try {
            storage.setItem(key, JSON.stringify(data) || []);
        } catch {
            clear();
        }
    }

    function clearAll() {
        storage.clear();
    }

    return {
        getItem: getItem,
        saveItem: saveItem,
        clearAll: clearAll
    }
};