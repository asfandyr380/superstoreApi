const { createCheckout } = require('./checkout.services');

module.exports = {
    checkOut: (req, res) => {
        var body = req.body;
        createCheckout(body, (err, result) => {
            if (err) {
                return res.json({
                    success: 0,
                    message: "Database Connection Error"
                });
            }
            return res.json({
                success: 1,
                message: "Product Successfully Ordered"
            });
        });
    },
};