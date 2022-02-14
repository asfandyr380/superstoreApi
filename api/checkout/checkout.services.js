const pool = require('../../config/database');

module.exports = {
    createCheckout: (data, callBack) => {
        pool.query(`INSERT INTO checkout 
        (user_Id, coupon_Id, subTotal, grandtotal, payment_status, checkout_status, quentity) 
        VALUES(?,?,?,?,?,?, ?)`,
            [data.user_Id, data.coupon_Id, data.subTotal, data.grandtotal, data.payment_status, data.checkout_status, data.quentity],
            (error, results, fields) => {
                if (error) {
                    console.log(error);
                    return callBack(error);
                }
                return callBack(null, results);
            });
    },


    updateCheckoutStatus: (data, callBack) => {
        pool.query(
            `update checkout set payment_status = ? where checkout_Id = ?`,
            [
                data.status,
                data.id
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    }
};