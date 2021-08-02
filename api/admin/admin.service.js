const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO 
            admin(username, email, pass) 
            VALUES(? , ?, ?)`,
            [data.username, data.email, data.password],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getAdmins: callBack => {
        pool.query(
            `select id, username, email, mobile from admins`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getAdminById: (id, callBack) => {
        pool.query(
            `select id, username, email, mobile from admins where id = ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    updateAdmin: (id, data, callBack) => {
        pool.query(
            `update admins set username = ?, email = ?, mobile = ?, password = ? where id = ?`,
            [
                data.username,
                data.email,
                data.mobile,
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
    deleteAdmin: (id, callBack) => {
        pool.query(
            `delete from admins where id = ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    getAdminByEmail: (email, callBack) => {
        pool.query(
            `SELECT * FROM admin WHERE email = ?`,
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