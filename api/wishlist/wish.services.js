const pool = require('../../config/database');


module.exports = {

    addtoWishlist: (data, callBack) => {
        pool.query(`INSERT into wishlist(product_Id, user_Id) VALUES(?,?)`,
            [data.product_Id, data.user_Id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            });
    },

    countProducts: (userId, callBack) => {
        pool.query(`SELECT user_Id, count(product_Id) as totalProduct
        FROM wishlist
        WHERE user_Id = ?
        GROUP BY user_Id`,
            [userId],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            });
    },

    getWishProducts: (userId, callBack) => {
        pool.query(`SELECT *
        FROM wishlist w
        JOIN products p ON w.product_Id = p.Id
        JOIN product_cate pc ON p.cate_Id = pc.product_cate_Id
        WHERE user_Id = ?`,
            [userId],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            });
    },

    removeFromWishlist: (wishId, callBack) => {
        pool.query(`DELETE w.* FROM wishlist as w
        INNER JOIN products as p on w.product_Id = p.id
        WHERE w.product_Id = ?`, [wishId],
            (error, result, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, result);
            });
    },

};