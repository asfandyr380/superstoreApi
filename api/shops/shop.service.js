const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `insert into 
            stores(store_name, owner_name, store_description, email, phone, address, postal_code, password, logo) 
            values(?, ?, ?, ?, ?, ? ,?, ?, ?)`,
            [
                data.store_name,
                data.owner_name,
                data.desc,
                data.email,
                data.phone,
                data.address,
                data.postal_code,
                data.password,
                data.logo
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getShopCount: callBack => {
        pool.query(
            `SELECT COUNT(store_Id) as totalStores FROM stores`,
            [],
            (error, results, fields) => {
                if(error)
                {
                    console.log(error);
                   return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getShops: callBack => {
        pool.query(
            `SELECT * FROM stores`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getShopById: (id, callBack) => {
        pool.query(
            `select id, shop_name, email, mobile, address, open, close from shops where id = ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    updateShop: (id, data, callBack) => {
        pool.query(
            `update shops set shop_name = ?, email = ?, mobile = ?, address = ?, open = ?, close = ?, password = ? where id = ?`,
            [
                data.shop_name,
                data.email,
                data.mobile,
                data.address,
                data.open,
                data.close,
                data.password,
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
    deleteShop: (id, callBack) => {
        pool.query(
            `delete from stores where store_Id = ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    getShopByEmail: (email, callBack) => {
        pool.query(
            `select * from shops where email = ?`,
            [email],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
};