const pool = require('../../config/database');

const util = require('util');

var updateCartQuantity = (data, callBack) => {
    pool.query("UPDATE cart set quantity = quantity + 1 WHERE cart_Id = ?", [data.Id], (error, result) => {
        if (error) {
            console.log(error);
            return callBack(error);
        }
        return callBack(null, result);
    });
};


module.exports = {

    countProducts: (userId, callBack) => {
        pool.query(`SELECT user_Id, count(product_Id) as totalProduct
        FROM cart
        WHERE user_Id = ? and cart_status = 0
        GROUP BY user_Id`,
            [userId],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            });
    },

    addToCart: async (data, callBack) => {
        const query = util.promisify(pool.query).bind(pool);
        try {
            var result = await query(
                `SELECT * FROM cart
        WHERE user_id = ? AND product_Id = ?`, [data.user_Id, data.product_Id]);
            if (Object.keys(result).length === 0) {
                pool.query(
                    `INSERT
                into cart(product_Id, store_Id, user_Id, quantity, attributePrice) 
                values(?,?,?,?,?)`,
                    [
                        data.product_Id,
                        data.store_Id,
                        data.user_Id,
                        data.quantity,
                        data.attributePrice
                    ],
                    (err, results, fields) => {
                        if (err) {
                            return callBack(err);
                        }
                        return callBack(null, results);
                    });
            } else {
                updateCartQuantity(result[0], (err, res) => {
                    if (err) {
                        console.log(err);
                        return callBack(err);
                    }
                    return callBack(null, res);
                });
            }
        } catch (err) {
            console.log(err);
        }
    },

    getProductByCart: (userId, callBack) => {
        pool.query(`SELECT * 
        FROM cart c 
        JOIN products p ON c.product_Id = p.id
        JOIN stores s ON p.store_Id = s.store_Id
        JOIN product_cate pc ON p.cate_Id = pc.product_cate_Id
        WHERE user_Id = ? and cart_status = 0
        ORDER BY p.store_Id`,
            [userId],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            });
    },

    deleteFromCart: (cartId, callBack) => {
        pool.query(`DELETE 
        FROM cart
        WHERE cart_Id = ?`,
            [cartId],
            (err, results, fields) => {
                if (err) {
                    return callBack(err);
                }
                return callBack(null, results[0]);
            });
    },

    updateCartStatus: (data, callBack) => {
        pool.query(`UPDATE cart set cart_status = ?, order_Id = ? WHERE cart_Id = ?`,
            [data.cart_status, data.orderId, data.cartId],
            (error, result) => {
                if (error) {
                    console.log(error);
                    return callBack(error);
                }
                return callBack(null, result);
            });
    }

};