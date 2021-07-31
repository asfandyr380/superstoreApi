const pool = require('../../config/database');
const util = require('util');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            'insert into categories(category_name, cate_image) values(?, ?)',
            [
                data.shop_id,
                data.category_name
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
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
                var c = {Name: subCate["name"], SubCate: re};
                superCate.push(c);
            }
            var data = {MainCate: item['cate_name'], superCate};
            cate.push(data);
            superCate = [];
        }
        return callBack(null, cate);
    },

    getGeneralCate: callBack => {
        pool.query(`SELECT * FROM categories`,[], (error, result, fields) => {
            if(error)
            {
                console.log(error);
                return callBack(error);
            }
            return callBack(null, result);
        });
    },

    getSuperCate: (cateId, callBack) => {
        pool.query(`SELECT * FROM super_cate WHERE cate_Id = ?`,[cateId], (error, result, fields) => {
            if(error)
            {
                console.log(error);
                return callBack(error);
            }
            return callBack(null, result);
        });
    },

    getSubCate: (cateId, callBack) => {
        pool.query(`SELECT * FROM sub_cate WHERE superCate_Id = ?`,[cateId], (error, result, fields) => {
            if(error)
            {
                console.log(error);
                return callBack(error);
            }
            return callBack(null, result);
        });
    },

    updateCategory: (id, data, callBack) => {
        pool.query(
            `update categories set category_name = ? where id = ?`,
            [
                data.category_name,
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
    deleteCategory: (id, callBack) => {
        pool.query(
            `delete from categories where id = ?`,
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