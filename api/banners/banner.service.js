const pool = require('../../config/database');


module.exports = {
    getBanner: callBack => {
        pool.query(
            'select bannerid, image, mainText from banners',
            [],
            (error, resutls, fields) =>
            {
                if(error)
                {
                    return callBack(error);
                }
                return callBack(null, resutls);
            }
        );
    },
};