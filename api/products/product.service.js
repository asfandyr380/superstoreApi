const pool = require('../../config/database');
const util = require('util');
const { compareSync } = require('bcrypt');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            'insert into products(name, price, salePrice, description, store_Id, onSale, status, cate_Id, image, image2, image3,image4, search_Key, attribute_status, alt_tag, meta_keywords, meta_Desc, shortDesc) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [
                data.name,
                data.price,
                data.salePrice,
                data.description,
                data.store_Id,
                data.onSale,
                data.status,
                data.cate_Id,
                data.image,
                data.image2,
                data.image3,
                data.image4,
                data.searchKey,
                data.attribute_status,
                data.alt_tag,
                data.meta_keywords,
                data.meta_Desc,
                data.shortDesc,
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


    addAttributes: (data, callBack) => {
        pool.query(`INSERT INTO attribute(stock, variant, price, image, product_Id) VALUES(?,?,?,?,?)`,
            [data.stock, data.variant, data.price, data.image, data.productId],
            (error, result, fields) => {
                if (error) {
                    console.log(error);
                    return callBack(error);
                }
                return callBack(null, result);
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

    getAllProducts: (callBack) => {
        pool.query(`
        SELECT * FROM products p
        JOIN product_cate c ON p.cate_Id = c.product_cate_Id
        JOIN stores s ON p.store_Id = s.store_Id`,
            [], (error, result, fields) => {
                if (error) {
                    console.log(error);
                    return callBack(error);
                }
                return callBack(null, result);
            });
    },

    getStoreProducts: (id, callBack) => {
        pool.query(`
        SELECT * FROM products p
        JOIN product_cate c ON p.cate_Id = c.product_cate_Id
        JOIN stores s ON p.store_Id = s.store_Id
        where store_Id = ?`,
            [id], (error, result, fields) => {
                if (error) {
                    console.log(error);
                    return callBack(error);
                }
                return callBack(null, result);
            });
    },

    searchAllProducts: (key, callBack) => {
        pool.query(`
        SELECT * FROM products p
        JOIN product_cate c ON p.cate_Id = c.product_cate_Id
        JOIN stores s ON p.store_Id = s.store_Id
        where search_Key LIKE ?`,
            ["%" + key + "%"], (error, result, fields) => {
                if (error) {
                    console.log(error);
                    return callBack(error);
                }
                return callBack(null, result);
            });
    },


    searchAllProductsByStoreName: (key, callBack) => {
        pool.query(`
        SELECT * FROM products p
        JOIN product_cate c ON p.cate_Id = c.product_cate_Id
        JOIN stores s ON p.store_Id = s.store_Id
        where store_name LIKE ?`,
            ["%" + key + "%"], (error, result, fields) => {
                if (error) {
                    console.log(error);
                    return callBack(error);
                }
                return callBack(null, result);
            });
    },


    searchAllProductsBySubCate: (key, callBack) => {
        pool.query(`
        SELECT * FROM products p
        JOIN product_cate c ON p.cate_Id = c.product_cate_Id
        JOIN stores s ON p.store_Id = s.store_Id
        where cate_name LIKE ?`,
            ["%" + key + "%"], (error, result, fields) => {
                if (error) {
                    console.log(error);
                    return callBack(error);
                }
                return callBack(null, result);
            });
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
            LIMIT 15
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
            LIMIT 10
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

    updateAttributeStatus: (id, state, callBack) => {
        pool.query(
            `UPDATE products set attribute_status = ? WHERE id = ?`,
            [
                state,
                id
            ],
            (error, results, fields) => {
                if (error) {
                    console.log(err);
                }
                console.log('Status Updated');
            }
        );
    },


    updateProduct: (id, data, callBack) => {
        pool.query(
            `update products 
            set name = COALESCE(?, name), price = COALESCE(?, price), salePrice = COALESCE(?, salePrice), description = COALESCE(?, description), 
            store_Id = COALESCE(?, store_Id), onSale = COALESCE(?, onSale), cate_Id = COALESCE(?, cate_Id), 
            image = COALESCE(?, image), image2 = COALESCE(?, image2), image3 = COALESCE(?, image3), image4 = COALESCE(?, image4), 
            search_Key = COALESCE(?, search_Key), attribute_status = COALESCE(?, attribute_status), alt_tag = COALESCE(?, alt_tag), 
            meta_keywords = COALESCE(?, meta_keywords), meta_Desc = COALESCE(?, meta_Desc), shortDesc = COALESCE(?, shortDesc) where id = ?`,
            [
                data.name,
                data.price,
                data.salePrice,
                data.description,
                data.store_Id,
                data.onSale,
                data.cate_Id,
                data.image,
                data.image2,
                data.image3,
                data.image4,
                data.searchKey,
                data.attribute_status,
                data.alt_tag,
                data.meta_keywords,
                data.meta_Desc,
                data.shortDesc,
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

    deleteProductsWithStore: (id, callBack) => {
        pool.query(`DELETE FROM products WHERE store_Id = ?`, [id], (error, result, fields) => {
            if (error) {
                console.log(error);
                return callBack(error);
            }
            return callBack(null, result);
        });
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