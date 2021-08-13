const { create,
    getProducts,
    onSaleProducts,
    topSellingProducts,
    updateProduct,
    deleteProduct,
    getProductsByCategories,
    getByPrice,
    searchProduct,
    getAttribute,
    getProductCount,
    getProductCategoryCount,
    getTopSellingCount,
    getOnsaleCount,
    addAttributes,
    updateAttributeStatus,
    getAllProducts,
} = require('./product.service');
const uploadImageMiddlewareMulti = require('../Upload/MultiUploadMiddleware');
const uploadImageMiddleware = require('../Upload/uploadMiddleware');
const { getAdminByEmail } = require('../admin/admin.service');
var path = require('path');
const { compareSync } = require('bcrypt');

var root = path.dirname(require.main.filename);
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

    getAll: (req, res) => {
        getAllProducts((err, results) => {
            if (err) {
                return res.status(500).json({ success: 0, message: "Database Error" });
            }
            if (!results) {
                return res.status(404).json({ success: 0, message: "No Products Found" });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },

    upload: async (req, res) => {
        try {
            console.log(req.files);
            await uploadImageMiddlewareMulti(req, res);
            if (req.files == undefined) {
                return res.status(400).send({ message: "Please Upload an Image" });
            }
            return res.status(200).json(req.files);
        } catch (err) {
            console.log(err);
        }
    },

    getimages: (req, res) => {
        var image = req.params.image;
        return res.sendFile(
            root + '/assets/images/Products/' + image
        );
    },
    getAttributeimages: (req, res) => {
        var image = req.params.image;
        return res.sendFile(
            root + '/assets/images/Stores/' + image
        );
    },

    getAttr: async (req, res) => {
        var id = req.params.id;
        var result = await getAttribute(id);
        return res.json({ success: 1, data: result });
    },

    uploadAttributeImg: async (req, res) => {
        try {
            await uploadImageMiddleware(req, res);
            if (req.file == undefined) {
                return res.status(400).send({ message: "Please Upload an Image" });
            }
            return res.status(200).json(req.file['filename']);
        } catch (err) {
            console.log(err);
        }
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
        const email = req.body.email;
        const password = req.body.password;
        getAdminByEmail(email, (err, result) => {
            if (err) {
                return res.json({ success: 0, messgae: "Something is Wrong" });
            }
            if (!result) {
                return res.json({ success: 0, message: "No User Found" });
            }
            var matchPass = compareSync(password, result.pass);
            if (matchPass) {
                deleteProduct(id, (err, results) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    return res.json({
                        success: 1,
                        data: 'Product deleted successfully'
                    });
                });
            } else {
                return res.json({ success: 0, message: "Password is Wrong" });
            }
        });
    }
}