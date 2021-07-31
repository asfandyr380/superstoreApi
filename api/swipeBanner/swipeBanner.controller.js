const { getSwipeBanner } = require('./swipeBanner.service');

module.exports = {
    getSwipeBanners: (req, res) => {
        getSwipeBanner((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "No Banners Found"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    }
};