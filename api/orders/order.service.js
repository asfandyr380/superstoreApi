const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            'insert into orders(user_id, product_id, quantity, address, transaction_no) values(?, ?, ?, ?, ?)',
            [
                data.user_id,
                data.product_id,
                data.quantity,
                data.address,
                data.transaction_no
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getCount: callBack => {
        pool.query(
            `SELECT COUNT(orderId) as totalOrders FROM orders`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getOrders: callBack => {
        pool.query(
            `SELECT orderId, userAddress, date, username, u.email, mobile, discount, coupon_No, u.postal_Code, subTotal, grandTotal, quentity, store_name, u.address as StoreAddress
             FROM orders o
            JOIN users u ON o.user_Id = u.Id 
            JOIN checkout c ON o.checkout_Id = c.checkout_Id
            JOIN coupons co ON c.coupon_Id = co.coupon_Id
            JOIN stores s ON o.store_Id = s.store_Id`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getShopOrders: (id, callBack) => {
        pool.query(
            // `select id, shop_id, name, created_at from categories where id = ?`,
            `select orders.id, users.username, products.item_name, categories.category_name, shops.shop_name, products.image, orders.quantity, products.price, products.duration, orders.created_at from orders inner join users on orders.user_id = users.id inner join products on orders.product_id = products.id inner join shops on products.shop_id = shops.id inner join categories on products.category_id = categories.id where products.shop_id= ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getOrderById: (id, callBack) => {
        pool.query(
            // `select id, shop_id, name, created_at from categories where id = ?`,
            `select orders.id, users.username, products.item_name, categories.category_name, shops.shop_name, products.image, orders.quantity, products.price, products.duration, orders.created_at from orders inner join users on orders.user_id = users.id inner join products on orders.product_id = products.id inner join shops on products.shop_id = shops.id inner join categories on products.category_id = categories.id where orders.id= ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    updateOrder: (id, data, callBack) => {
        pool.query(
            `update orders set product_id = ?, quantity = ? where id = ?`,
            [
                data.product_id,
                data.quantity,
                id
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    deleteOrder: (id, callBack) => {
        pool.query(
            `delete from orders where id = ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
};