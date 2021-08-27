const pool = require('../../config/database');
const util = require('util');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            'insert into product_cate(main_cate, cate_name, subCate_name) values(?, ?, ?)',
            [
                data.generalCate,
                data.superCate,
                data.subCate,
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    createNewCatgory: async (data, callBack) => {
        pool.query(`INSERT INTO categories(cate_name) VALUES(?)`, [data.GeneralCate],
            async (error, result, fields) => {
                if (error) {
                    console.log(error);
                    return;
                }
                var l = [];
                l = data.SuperCate;
                if (l.length !== 0) {
                    const query = util.promisify(pool.query).bind(pool);

                    for (i = 0; i < l.length; i++) {
                        var sup = await query(`INSERT INTO super_cate(cate_Id, name) VALUES(?, ?)`, [result['insertId'], l[i]['name']]);
                        // console.log(l[i]['SubCate']);
                        var li = l[i]['SubCate'];
                        if (li.length !== 0) {
                            for (j = 0; j < li.length; j++) {
                                var sub = await query(`INSERT INTO sub_cate(superCate_Id, name) VALUES(?, ?)`, [sup['insertId'], li[j]['name']]);
                            }
                        }
                    }
                    return callBack(null, result);
                }

            });
    },

    getCategories: async callBack => {
        var cate = [];
        var superCate = [];
        const query = util.promisify(pool.query).bind(pool);
        var result = await query(`SELECT * FROM categories`);
        var tempId = result[0]['cate_Id'];
        for (i = 0; i < result.length; i++) {
            var item = result[i];
            var cateId = item['cate_Id'];
            var res = await query(`SELECT * FROM super_cate WHERE cate_Id = ?`, [cateId]);
            for (j = 0; j < res.length; j++) {
                var subCate = res[j];
                var subId = subCate['superCate_Id'];
                var re = await query(`SELECT name FROM sub_cate WHERE superCate_Id = ?`, [subId]);
                var c = { Name: subCate["name"], SubCate: re };
                superCate.push(c);
            }
            var data = { MainCate: item['cate_name'], superCate };
            cate.push(data);
            superCate = [];
        }
        return callBack(null, cate);
    },

    getGeneralCate: callBack => {
        pool.query(`SELECT * FROM categories`, [], (error, result, fields) => {
            if (error) {
                console.log(error);
                return callBack(error);
            }
            return callBack(null, result);
        });
    },

    getSuperCate: (cateId, callBack) => {
        pool.query(`SELECT * FROM super_cate WHERE cate_Id = ?`, [cateId], (error, result, fields) => {
            if (error) {
                console.log(error);
                return callBack(error);
            }
            return callBack(null, result);
        });
    },

    getAllSuperCate: (callBack) => {
        pool.query(`SELECT * FROM super_cate`, [], (error, result, fields) => {
            if (error) {
                console.log(error);
                return callBack(error);
            }
            return callBack(null, result);
        });
    },

    getSubCate: (cateId, callBack) => {
        pool.query(`SELECT * FROM sub_cate WHERE superCate_Id = ?`, [cateId], (error, result, fields) => {
            if (error) {
                console.log(error);
                return callBack(error);
            }
            return callBack(null, result);
        });
    },

    updateGeneralCate: (data, callBack) => {
        pool.query(
            `update categories set cate_name = COALESCE(?, cate_name) where cate_Id = ?`,
            [
                data.name,
                data.Id
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },

    updateSuperCategory: (data, callBack) => {
        pool.query(
            `update super_cate set name = COALESCE(?, name) where superCate_Id = ?`,
            [
                data.supername,
                data.superId
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },

    updateSubCategory: (data, callBack) => {
        pool.query(
            `update sub_cate set name = COALESCE(?, name) where subCate_Id = ?`,
            [
                data.subname,
                data.subId
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },

    addnewSubCategorys: (data, callBack) => {
        pool.query(
            `Insert into sub_cate(name, superCate_Id) Values(?, ?)`,
            [
                data.name,
                data.superId
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },

    addnewSuperCategorys: (data, callBack) => {
        pool.query(
            `Insert into super_cate(name, cate_Id) Values(?, ?)`,
            [
                data.name,
                data.cateId
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },

    deleteCategory: async (id, callBack) => {
        pool.query(
            `delete from categories where cate_Id = ?`,
            [id],
            async (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                const query = util.promisify(pool.query).bind(pool);
                var q = await query(`select * from super_cate where cate_Id = ?`, [id]);
                pool.query(
                    `delete from super_cate where cate_Id = ?`,
                    [id],
                    (error, results, fields) => {
                        if (error) {
                            return callBack(error);
                        }
                        for (i = 0; i < q.length; i++) {
                            var qId = q[i]['superCate_Id'];
                            pool.query(
                                `delete from sub_cate where superCate_Id = ?`,
                                [qId],
                                (error, results, fields) => {
                                    if (error) {
                                        console.log(error);
                                        return callBack(error);
                                    }
                                }
                            );
                        }
                        return callBack(null, results[0]);
                    }
                );
            }
        );
    },

    deleteSubCate: (id, callBack) => {
        pool.query(
            `delete from sub_cate where subCate_Id = ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },

    deleteSuperCate: (id, callBack) => {
        pool.query(
            `delete from super_cate where superCate_Id = ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                pool.query(
                    `delete from sub_cate where superCate_Id = ?`,
                    [id],
                    (error, results, fields) => {
                        if (error) {
                            return callBack(error);
                        }
                        return callBack(null, results[0]);
                    }
                );
            }
        );
    },

    updateProductCate: (id, data, callBack) => {
        pool.query(
            `update product_cate set
             main_cate = COALESCE(?, main_cate),
             cate_name = COALESCE(?, cate_name),
             subCate_name = COALESCE(?, subCate_name)
             where product_cate_Id = ?`,
            [
                data.mainCate,
                data.superCate,
                data.subCateName,
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

    getProductCate: (id, callBack) => {
        pool.query(
            `select * from product_cate where product_cate_Id = ?`,
            [parseInt(id)],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },

};