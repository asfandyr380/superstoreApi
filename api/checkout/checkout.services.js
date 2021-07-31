const pool = require('../../config/database');

module.exports = {
    createCheckout: (data, callBack) => {
        pool.query(`INSERT INTO checkout (user_Id, payment_status, grandtotal, discount, coupon_Id, checkout_status) VALUES(?,?,?,?,?,?)`,
            [data.user_Id, data.payment_status, data.grandtotal, data.discount, data.coupon_Id, data.checkout_status],
            (error, results, fields) => {
                if(error)
                {
                    console.log(error);
                    return callBack(error);
                }
                return callBack(null, results);
            });
    },
};