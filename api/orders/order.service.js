const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            'insert into orders(userAddress, checkout_Id, date, postal_Code, order_status, username, seen) values(?, ?, ?, ?, ?, ?, ?)',
            [
                data.userAddress,
                data.checkout_Id,
                data.date,
                data.postalCode,
                data.order_status,
                data.username,
                data.seen,
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
            `SELECT COUNT(distinct orderId) as totalOrders FROM orders`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    countUnseenOrders: callBack => {
        pool.query(
            `SELECT COUNT(distinct orderId) as totalOrders, seen FROM orders where seen = 0`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    updateSeenStatus: (id, callBack) => {
        pool.query(
            `update orders set seen = 1 where orderId = ?`,
            [
                parseInt(id)
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },

    getCountforStore: (id, callBack) => {
        pool.query(
            `SELECT COUNT(distinct orderId) as totalOrders FROM orders o
            join cart c on c.order_Id = o.orderId
            where c.cart_status = 1 and c.store_Id = ?
            GROUP BY o.orderId
            order by o.orderId`,
            [id],
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
            where c.cart_status = 1 and o.postal_Code Like ?`,
            [name + "%"],
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
            `select * from orders o
            join cart c on c.order_Id = o.orderId
            join checkout ch on ch.checkout_Id = o.checkout_Id
            join products p on p.Id = c.product_Id
            join stores s on s.store_Id = c.store_Id
            join coupons cou on cou.coupon_Id = ch.coupon_Id
            where c.cart_status = 1
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
            where c.cart_status = 1 and s.store_Id = ?
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

    updateOrderStatus: (id, status, callBack) => {
        pool.query(
            `update orders set order_status = ? where orderId = ?`,
            [
                status,
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

    checkifOrdered: (id, callBack) => {
        pool.query(
            `select * from orders where checkout_Id = ?`,
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