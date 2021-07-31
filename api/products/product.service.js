const pool = require('../../config/database');
const util = require('util');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            'insert into products(store, name, price, salePrice, description, status, onSale) values(?, ?, ?, ?, ?, ?, ?)',
            [
                data.store,
                data.name,
                data.price,
                data.salePrice,
                data.description,
                data.status,
                data.onSale
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    searchProduct: (data, callBack) => {
        pool.query(`SELECT store_name, s.store_Id, id, name, price, salePrice, description, 
        onSale, status, store_status, image, image2, image3,image4, main_cate,
        cate_name, subCate_name, attribute_status
        FROM stores s
        JOIN products p on s.store_Id = p.store_Id
        JOIN product_cate pc ON p.cate_Id = pc.product_cate_Id
        WHERE status = 1 AND store_status = 1 AND search_Key LIKE ? LIMIT 5`,
            [data.key],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            });
    },

    getAttribute: async (id) => {
        const query = util.promisify(pool.query).bind(pool);
        var res = await query(`SELECT * FROM attribute WHERE product_Id = ?`, [id]);
        if (!res) {
            return;
        }
        return res;
    },


    getProductCount: async () => {
        const query = util.promisify(pool.query).bind(pool);
        var res = await query(
            `SELECT count(id) as total
        FROM stores s
        JOIN products p on s.store_Id = p.store_Id
        JOIN product_cate pc ON p.cate_Id = pc.product_cate_Id
        WHERE status = 1 AND store_status = 1`);
        return res;
    },

    getProducts: async (offset, callBack) => {
        pool.query(
            `SELECT store_name, s.store_Id, id, name, price, salePrice, description, 
            onSale, status, store_status, image, image2, image3,image4, main_cate,
            cate_name, subCate_name, attribute_status
            FROM stores s
            JOIN products p on s.store_Id = p.store_Id
            JOIN product_cate pc ON p.cate_Id = pc.product_cate_Id
            WHERE status = 1 AND store_status = 1
            ORDER BY price
            LIMIT 1
            OFFSET ?`,
            [parseInt(offset)],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }

                return callBack(null, results);
            }
        );
    },
    getByPrice: (start, end, callBack) => {
        pool.query(
            `SELECT store_name, s.store_Id, id, name, price, salePrice, description, 
            onSale, status, store_status, image, image2, image3,image4,main_cate,
            cate_name, subCate_name, attribute_status
            FROM stores s
            JOIN products p on s.store_Id = p.store_Id
            JOIN product_cate pc ON p.cate_Id = pc.product_cate_Id
            WHERE status = 1 AND store_status = 1 AND price >= ? && price <= ?
            ORDER BY price`,
            [start, end],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getOnsaleCount: async () => {
        const query = util.promisify(pool.query).bind(pool);
        var res = await query(
        `SELECT count(id) as total
        FROM stores s
        JOIN products p on s.store_Id = p.store_Id
        JOIN product_cate pc ON p.cate_Id = pc.product_cate_Id
        WHERE status = 1 AND store_status = 1 AND onSale = 1`);
        return res;
    },

    onSaleProducts: async (page, callBack) => {
        pool.query(
            `SELECT store_name, s.store_Id, id, name, price, salePrice, description, 
            onSale, status, store_status, image, image2, image3, image4, main_cate,
            cate_name, subCate_name, attribute_status
            FROM stores s
            JOIN products p on s.store_Id = p.store_Id
            JOIN product_cate pc ON p.cate_Id = pc.product_cate_Id
            WHERE status = 1 AND onsale = 1 AND store_status = 1
            ORDER BY price
            LIMIT 15
            OFFSET ?`,
            [parseInt(page)],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getTopSellingCount: async () => {
        const query = util.promisify(pool.query).bind(pool);
        var res = await query(
            `SELECT count(id) as total
        FROM stores s
        JOIN products p on s.store_Id = p.store_Id
        JOIN product_cate pc ON p.cate_Id = pc.product_cate_Id
        WHERE status = 1 AND store_status = 1 AND sold >= 5`);
        return res;
    },


    topSellingProducts: async (page, callBack) => {
        pool.query(
            // `select id, shop_id, name, created_at from categories where id = ?`,
            `SELECT store_name, s.store_Id, id, name, price, salePrice, description, 
            onSale, status, store_status, store_name, image, image2, image3, image4,main_cate,
            cate_name, subCate_name, sold, attribute_status
            FROM stores s
            JOIN products p on s.store_Id = p.store_Id
            JOIN product_cate pc ON p.cate_Id = pc.product_cate_Id
            WHERE status = 1 AND store_status = 1 AND sold >= 5
            ORDER BY price
            LIMIT 15
            OFFSET ?`,
            [parseInt(page)],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },


    getProductCategoryCount: async (cate, subCate) => {
        const query = util.promisify(pool.query).bind(pool);
        var res = await query(
            `SELECT count(id) as total
        FROM stores s
        JOIN products p on s.store_Id = p.store_Id
        JOIN product_cate pc ON p.cate_Id = pc.product_cate_Id
        WHERE status = 1 AND store_status = 1 AND 
        cate_name = ?
        OR subCate_name = ?`, [cate, subCate]);
        return res;
    },

    getProductsByCategories: async (body, offset, callBack) => {
        pool.query(
            `SELECT store_name, s.store_Id, id, name, price, salePrice, description, 
            onSale, status, store_status, image, image2, image3, image4,main_cate,
            cate_name, subCate_name, sold, attribute_status
            FROM stores s
            JOIN products p on s.store_Id = p.store_Id
            JOIN product_cate pc ON p.cate_Id = pc.product_cate_Id
            WHERE status = 1 AND store_status = 1 AND 
            cate_name = ?
            OR subCate_name = ?
            ORDER BY price
            LIMIT 1
            OFFSET ?`,
            [body.cate, body.subCate, parseInt(offset)],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    updateProduct: (id, data, callBack) => {
        pool.query(
            `update products set category_id = ?, item_name = ?, image = ?, price = ?, duration = ?, description = ? where id = ?`,
            [
                data.category_id,
                data.item_name,
                data.image,
                data.price,
                data.duration,
                data.description,
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
    deleteProduct: (id, callBack) => {
        pool.query(
            `delete from products where id = ?`,
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