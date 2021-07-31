const { getWishProducts, addtoWishlist, countProducts, removeFromWishlist } = require('./wish.services');

module.exports = {

    addProduct: (req, res) => {
        const body = req.body;
        addtoWishlist(body, (err, result) => {
            if (err) {
                console.log(err);
                return res.json({
                    success: 0,
                    message: 'Database Connection Error'
                });
            }
            return res.json({
                success: 1,
                message: "Product Added Successfully to Wishlist"
            });
        });
    },

    count: (req, res) => {
        const userId = req.params.id;
        countProducts(userId, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database Connection Error"
                });
            }
            if (!result) {
                return res.json({
                    success: 0,
                    message: "No Products Are Available in Your Wishlist"
                });
            }
            return res.json(result);
        });
    },

    wishProducts: (req, res) => {
        const id = req.params.id
        getWishProducts(id, (err, result) => {
            if (err) {
                console.log(err);
                return res.json({
                    success: 0,
                    message: "Database Connection Error"
                });
            }
            if (!result) {
                return res.json({
                    success: 0,
                    message: "No Products Where Found"
                });
            }
            return res.json(result);
        });
    },

    removeProduct: (req, res) => {
        const id = req.params.id;
        removeFromWishlist(id, (err, result) => {
            if (err) {
                console.log(err);
                return res.json({
                    success: 0,
                    message: "Database Connection Error"
                });
            }
            return res.json({
                success: 1,
                message: "Product Removed From Wishlist"
            });
        });
    }


};