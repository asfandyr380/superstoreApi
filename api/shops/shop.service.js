const { response } = require('express');
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
                if (error) {
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

    updateStoreStatus: (id, status, callBack) => {
        pool.query(`UPDATE stores SET store_status = ? WHERE store_Id = ?`, [status, id], (error, result, fields) => {
            if (error) {
                console.log(error);
                return callBack(error);
            }
            return callBack(null, result);
        });
    },

    updateStore: (id, data, callBack) => {
        pool.query(`UPDATE stores 
        set store_name = ?, owner_name = ?, email = ?, address = ?, postal_code = ?, phone = ?, logo = COALESCE(?, logo) 
        WHERE store_Id = ?`,
            [data.name, data.owner_name, data.email, data.address, data.postal_code, data.phone, data.logo, id],
            (error, result, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, result);
            });
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

    searchStoreByName: (name, callBack) => {
        pool.query(
            `SELECT * FROM stores WHERE store_name LIKE ?`,
            [name + "%"],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    searchStoreByOwnerName: (name, callBack) => {
        pool.query(
            `SELECT * FROM stores WHERE owner_name LIKE ?`,
            [name + "%"],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    searchStoreByPostalCode: (name, callBack) => {
        pool.query(
            `SELECT * FROM stores WHERE postal_code LIKE ?`,
            [name + "%"],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getShopByEmail: (email, callBack) => {
        pool.query(
            `SELECT * FROM stores WHERE email = ?`,
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