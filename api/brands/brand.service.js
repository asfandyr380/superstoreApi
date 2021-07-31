const pool = require('../../config/database');

module.exports = {
    getBrand: callBack => {
        pool.query(
            'select id, brandName, image from brands',
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    }
};