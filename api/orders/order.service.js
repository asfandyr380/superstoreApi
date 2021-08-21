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


    searchOrderByUsername: (name, callBack) => {
        pool.query(
            `select * from orders o
            join cart c on c.order_Id = o.orderId
            join checkout ch on ch.checkout_Id = o.checkout_Id
            join products p on p.Id = c.product_Id
            join stores s on s.store_Id = c.store_Id
            join coupons cou on cou.coupon_Id = ch.coupon_Id
            where c.cart_status = 1 and username Like ?`,
            [name + "%"],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    searchOrderByPostalcode: (name, callBack) => {
        pool.query(
            `select * from orders o
            join cart c on c.order_Id = o.orderId
            join checkout ch on ch.checkout_Id = o.checkout_Id
            join products p on p.Id = c.product_Id
            join stores s on s.store_Id = c.store_Id
            join coupons cou on cou.coupon_Id = ch.coupon_Id
            where c.cart_status = 1 and postal_Code Like ?`,
            [name + "%"],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                console.log(results);
                return callBack(null, results);
            }
        );
    },

    getOrders: callBack => {
        pool.query(
            `select * from orders o
            join cart c on c.order_Id = o.orderId
            join checkout ch on ch.checkout_Id = o.checkout_Id
            join products p on p.Id = c.product_Id
            join stores s on s.store_Id = c.store_Id
            join coupons cou on cou.coupon_Id = ch.coupon_Id
            where c.cart_status = 1 and o.order_status = 0
            order by o.orderId`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getstoreOrder: (id, callBack) => {
        pool.query(
            `select * from orders o
            join cart c on c.order_Id = o.orderId
            join checkout ch on ch.checkout_Id = o.checkout_Id
            join products p on p.Id = c.product_Id
            join stores s on s.store_Id = c.store_Id
            join coupons cou on cou.coupon_Id = ch.coupon_Id
            where c.cart_status = 1 and o.order_status = 0 and s.store_Id = ?
            order by orderId`,
            [id],
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