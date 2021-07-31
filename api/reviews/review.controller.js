const { getReviews } = require('./review.service');


module.exports = {
    reviews: (req, res) => {
        getReviews((err, result) => {
            if (err) {
                console.log(err);
                return res.json({
                    success: 0,
                    message: "Database Connecttion Error"
                });
            }
            if (!result) {
                return res.json({
                    success: 0,
                    message: "No Review Were Found"
                });
            }
            return res.json(result);
        });
    },
};