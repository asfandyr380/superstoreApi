const pool = require('../../config/database');


module.exports = {
    getReviews: callBack => {
        pool.query(
        `SELECT username, message, rating
        FROM reviews
        JOIN users ON user_Id = id`, 
        [], 
        (error, result, fields) => {
            if(error)
            {
                callBack(error);
            }
            return callBack(null, result);
        });
    },
};