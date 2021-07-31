const { getBrand } = require('./brand.service');

module.exports = {
    getBrands: (req, res) => {
        getBrand((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "No Brands Were Found"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    }
};

