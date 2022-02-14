const { createCheckout, updateCheckoutStatus } = require('./checkout.services');

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
                message: "Product Successfully Ordered",
                data: result,
            });
        });
    },

    updateStatus: (req, res) => {
        const data = req.body;
        updateCheckoutStatus(data, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: 'Oops something went wrong'
                });
            }
            return res.status(200).json({
                success: 1,
                message: 'Status updated successfully'
            });
        });
    },
};