SAREhub = typeof SAREhub === "undefined" ? {} : SAREhub;
SAREhub.SareWebApi = (function () {
    var basicInfo = {
        'userId': '10',
        'email': 'test@test.pl',
        'country': 'pl',
        'language': 'pl'
    };

    function categorySeen(categoryId) {
        sareX_params.tag = {
            '_userId': basicInfo.userId,
            '_email': basicInfo.email,
            '_category': {
                'country': basicInfo.country,
                'language': basicInfo.language,
                'id': categoryId
            }
        };
    }

    return {
        categorySeen: categorySeen
    };
})();