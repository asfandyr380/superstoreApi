const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(`INSERT INTO messages(name, email, phone, message) VALUES(?,?,?,?)`,
            [data.name, data.email, data.phone, data.message],
            (error, result, field) => {
                if (error) {
                    console.log(error);
                    return callBack(error);
                }
                return callBack(null, result);
            });
    },


    getMessages: callBack => {
        pool.query(
            `SELECT * FROM messages`,
            [],
            (error, result, field) => {
                if (error) {
                    console.log(error);
                    return callBack(error);
                }
                return callBack(null, result);
            },
        );
    },

    messageCount: callBack => {
        pool.query(
            `SELECT COUNT(Id) as totalMsg FROM messages`,
            [],
            (error, result, field) => {
                if (error) {
                    console.log(error);
                    return callBack(error);
                }
                return callBack(null, result);
            },
        );
    },

};