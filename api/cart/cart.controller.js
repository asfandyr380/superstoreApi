const pool = require('../../config/database');
const { getProductByCart, deleteFromCart, addToCart, countProducts, updateCartStatus, updateCartQuantity } = require('./cart.services');

module.exports = {
    toCart: (req, res) => {
        const body = req.body;
        addToCart(body, (err, result) => {
            if (err) {
                console.log(err);
                return res.json({
                    success: 0,
                    message: 'Database Connection Error'
                });
            }
            return res.status(200).json({
                success: 1,
                message: 'Product Saved To Cart Successfully'
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

    byCart: (req, res) => {
        const user_Id = req.params.id;
        getProductByCart(user_Id, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: 'Database Connection Error'
                });
            }
            if (!result) {
                return res.json({
                    success: 0,
                    message: 'No Products were found in your cart'
                });
            }
            if (result.length > 0) {
                var temp_Id = result[0]['store_Id'];
                var temp_name = result[0]['store_name'];
                var products = [];
                var finallist = [];
                var data;
                for (i = 0; i < result.length; i++) {
                    var item = result[i];
                    var storeId = item['store_Id'];
                    if (storeId === temp_Id) {
                        var product = item;
                        products.push(product);
                        if (i === result.length - 1) {
                            data = { store_Name: temp_name, Products: products };
                            finallist.push(data);
                        }
                    } else {
                        data = { store_Name: temp_name, Products: products };
                        finallist.push(data);
                        temp_Id = storeId;
                        temp_name = item['store_name'];
                        products = [];
                        products.push(item);
                        var data = { store_Name: temp_name, Products: products };
                        finallist.push(data);
                    }

                }
            } else {
                return res.json(
                    result
                )
            }
            return res.json(
                finallist
            );
        });
    },

    deleteCart: (req, res) => {
        const id = req.params.id;
        deleteFromCart(id, (err, result) => {
            if (err) {
                console.log(err);
                return res.json({
                    success: 0,
                    message: 'Database Connection Error'
                });
            }
            return res.json({
                success: 1,
                message: 'Product Removed From Cart Successfully'
            })
        });
    },

    updateCart: (req, res) => {
        var body = req.body;
        updateCartStatus(body, (err, result) => {
            if (err) {
                return res.json({
                    success: 0,
                    message: "Database Connection Error"
                });
            }
            return res.json({
                success: 1,
                message: "Status Updated Successfully"
            });
        });
    },
};