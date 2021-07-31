const pool = require('../../config/database');

module.exports = {
    getSwipeBanner: callBack => {
        pool.query(
            'select id, cate, mainText, subText, image from swipeBanners',
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            });
    }
};