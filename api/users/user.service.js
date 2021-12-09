const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            'select email from users where email = "' + data.email + '"', function (err, result) {
                if (err) {
                    throw err;
                }
                if (result.length > 0) {
                    return callBack(null, "Email Already Exists");
                } else {
                    pool.query(
                        `insert into 
                        users(username, email, mobile, password, address, city, postal_code) 
                        values(?, ?, ?, ?, ?, ?, ?)`,
                        [data.username,
                        data.email,
                        data.mobile,
                        data.password,
                        data.address,
                        data.city,
                        data.postal_code],
                        (error, results, fields) => {
                            if (error) {
                                return callBack(error);
                            }
                            return callBack(null, results);
                        }
                    );
                }
               }
        );

    },
    getUsers: callBack => {
        pool.query(
            `select id, username, email, mobile from users`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getUserById: (id, callBack) => {
        pool.query(
            `select * from users where id = ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    updateUser: (id, data, callBack) => {
        pool.query(
            `update users set username = ?, email = ?, mobile = ?, password = ? where id = ?`,
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
    deleteUser: (id, callBack) => {
        pool.query(
            `delete from users where id = ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    getUserByEmail: (email, callBack) => {
        pool.query(
            `select * from users where email = ?`,
            [email],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },

    updatePassword: (password, id, callBack) => {
        pool.query(`update users set password = ? where id = ?`,
            [password, id],
            (error, result, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, result);
            });
    },

    updateVerificationStatus: (id, callBack) => {
        pool.query(`update users set isVerified = 1 where id = ?`,
            [id],
            (error, result, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, result);
            });
    },

};