const { create,
    getProducts,
    onSaleProducts,
    topSellingProducts,
    updateProduct,
    deleteProduct,
    getProductsByCategories,
    getByPrice,
    searchProduct,
    getAttribute, getProductCount, getProductCategoryCount, getTopSellingCount, getOnsaleCount, addAttributes, updateAttributeStatus,
} = require('./product.service');
const pool = require('../../config/database');


module.exports = {
    createProduct: (req, res) => {
        const body = req.body;
        create(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: 'Database connection error'
                });
            }
            return res.status(200).json({
                success: 1,
                message: 'Product saved successfully !',
                data: results
            });
        });
    },


    attribute: (req, res) => {
        var data = req.body;
        addAttributes(data, (err, result) => {
            if (err) {
                res.json({ success: 0, message: err.message });
            }
            updateAttributeStatus(data.productId, 1);
            return res.json({
                success: 1,
                data: result
            });
        });
    },

    search: (req, res) => {
        const body = req.body;
        searchProduct(body, async (err, result) => {
            if (err) {
                console.log(err);
                return res.json({
                    success: 0,
                    message: "Database Connection Error"
                });
            }
            var li = [];
            for (i = 0; i < result.length; i++) {
                var item = result[i];
                var status = item['attribute_status'];
                var id = item['id'];
                if (status == 1) {
                    var ress = await getAttribute(id).catch((err) => {
                        console.log(err);
                    });
                    var data = { Product: item, Attribute: ress };
                    li.push(data);
                } else {
                    li.push({ Product: item, Attribute: [] });
                }
            }
            return res.json(li);
        });
    },

    getProducts: (req, res) => {
        var o = req.params.offset;
        getProducts(o, async (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: 'No Product found'
                });
            }
            var count = await getProductCount();
            var li = [];
            for (i = 0; i < results.length; i++) {
                var item = results[i];
                var status = item['attribute_status'];
                var id = item['id'];
                if (status == 1) {
                    var ress = await getAttribute(id).catch((err) => {
                        console.log(err);
                    });
                    var data = { Product: item, Attribute: ress };
                    li.push(data);
                } else {
                    li.push({ Product: item, Attribute: [] });
                }
            }
            return res.json(
                { Products: li, TotalProducts: count[0]['total'] }
            );
        });
    },
    saleProducts: (req, res) => {
        var page = req.params.page;
        onSaleProducts(page, async (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: 'No product found !'
                });
            }
            var count = await getOnsaleCount();
            var li = [];
            for (i = 0; i < results.length; i++) {
                var item = results[i];
                var status = item['attribute_status'];
                var id = item['id'];
                if (status == 1) {
                    var ress = await getAttribute(id).catch((err) => {
                        console.log(err);
                    });
                    var data = { Product: item, Attribute: ress };
                    li.push(data);
                } else {
                    li.push({ Product: item, Attribute: [] });
                }
            }
            return res.json(
                { Products: li, TotalProducts: count[0]['total'] }
            );
        });
    },
    topSelling: (req, res) => {
        var page = req.params.page
        topSellingProducts(page, async (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: 'Product not found'
                });
            }
            var count = await getTopSellingCount();
            var li = [];
            for (i = 0; i < results.length; i++) {
                var item = results[i];
                var status = item['attribute_status'];
                var id = item['id'];
                if (status == 1) {
                    var ress = await getAttribute(id).catch((err) => {
                        console.log(err);
                    });
                    var data = { Product: item, Attribute: ress };
                    li.push(data);
                } else {
                    li.push({ Product: item, Attribute: [] });
                }
            }
            return res.json(
                { Products: li, TotalProducts: count[0]['total'] }
            );
        });
    },
    byCategory: (req, res) => {
        const body = req.body;
        const offset = req.params.offset;
        getProductsByCategories(body, offset, async (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: 'Product not found'
                });
            }
            var count = await getProductCategoryCount(body.cate, body.subCate);
            var li = [];
            for (i = 0; i < results.length; i++) {
                var item = results[i];
                var status = item['attribute_status'];
                var id = item['id'];
                if (status == 1) {
                    var ress = await getAttribute(id).catch((err) => {
                        console.log(err);
                    });
                    var data = { Product: item, Attribute: ress };
                    li.push(data);
                } else {
                    li.push({ Product: item, Attribute: [] });
                }
            }
            return res.json(
                { Products: li, TotalProducts: count[0]['total'] }
            );
        });
    },
    byPrice: (req, res) => {
        const start = req.body.start;
        const end = req.body.end
        getByPrice(start, end, async (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: 'Product not found'
                });
            }
            var li = [];
            for (i = 0; i < results.length; i++) {
                var item = results[i];
                var status = item['attribute_status'];
                var id = item['id'];
                if (status == 1) {
                    var ress = await getAttribute(id).catch((err) => {
                        console.log(err);
                    });
                    var data = { Product: item, Attribute: ress };
                    li.push(data);
                } else {
                    li.push({ Product: item, Attribute: [] });
                }
            }
            return res.json(
                li
            );
        });
    },
    updateProduct: (req, res) => {
        const id = req.params.id;
        const body = req.body;
        updateProduct(id, body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: 'Oops something went wrong'
                });
            }
            // if (!results) {
            //     return res.json({
            //         success: 0,
            //         message: 'User not found'
            //     });
            // }
            return res.status(200).json({
                success: 1,
                message: 'Product updated successfully'
            });
        });
    },
    deleteProduct: (req, res) => {
        const id = req.params.id;
        deleteProduct(id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            // if (!results) {
            //     return res.json({
            //         success: 0,
            //         message: 'User not found'
            //     });
            // }
            return res.json({
                success: 1,
                data: 'Product deleted successfully'
            });
        });
    }
}