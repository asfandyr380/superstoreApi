const { create,
    getProducts,
    onSaleProducts,
    topSellingProducts,
    updateProduct,
    deleteProduct,
    getProductsByMainCategories,
    getProductsBySuperCategories,
    getProductsBySubCategories,
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
    searchAllProducts,
    searchAllProductsByStoreName,
    searchAllProductsBySubCate,
    getStoreProducts,
    getProductsByBrand,
    getStoreProductCount,
    getPendingProductCount,
    getPendingProducts,
    updateSalePrice,
    searchAllProductsBySubCateForStore,
    searchAllProductsForStore,
} = require('./product.service');
const uploadImageMiddlewareMulti = require('../Upload/MultiUploadMiddleware');
const uploadImageMiddleware = require('../Upload/uploadMiddleware');
const { getAdminByEmail } = require('../admin/admin.service');
const { getShopByEmail } = require('../shops/shop.service');

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

    productCountforStore: (req, res) => {
        const id = req.params.id;
        getStoreProductCount(id, (err, result) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({ success: 1, count: result[0] });
        });
    },


    pendingProductCount: (req, res) => {
        getPendingProductCount((err, result) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json(result[0]);
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


    pendingProducts: (req, res) => {
        getPendingProducts((err, results) => {
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

    getProductForStore: (req, res) => {
        const id = req.params.id;
        getStoreProducts(id, (err, result) => {
            if (err) {
                console.log(err);
                return res.json({ success: 0, message: "Something Went Wrong" });
            }
            return res.json({ success: 1, data: result });
        });
    },

    searchAll: (req, res) => {
        const key = req.params.key;
        searchAllProducts(key, (err, results) => {
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

    searchAllForStore: (req, res) => {
        const key = req.params.key;
        const id = req.params.id;
        searchAllProductsForStore(key, id, (err, results) => {
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


    searchAllByStore: (req, res) => {
        const key = req.params.key;
        searchAllProductsByStoreName(key, (err, results) => {
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

    searchAllByCate: (req, res) => {
        const key = req.params.key;
        searchAllProductsBySubCate(key, (err, results) => {
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


    searchAllByCateForStore: (req, res) => {
        const key = req.params.key;
        const id = req.params.id;
        searchAllProductsBySubCateForStore(key, id, (err, results) => {
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
        var limit = req.params.limit;
        getProducts(o, limit, async (err, results) => {
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
            var totalPage = Math.ceil(count[0]['total'] / 16);

            var li = [];
            for (let i = 0; i < results.length; i++) {
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
                { Products: li, TotalProducts: count[0]['total'], TotalPage: totalPage, CurrentProduct: parseInt(o) }
            );
        });
    },
    saleProducts: (req, res) => {
        onSaleProducts(async (err, results) => {
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
            for (let i = 0; i < results.length; i++) {
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
        topSellingProducts(async (err, results) => {
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
            for (let i = 0; i < results.length; i++) {
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
        res.setHeader("Content-Type", "application/json");
        const body = req.body;
        const offset = req.params.offset;
        const list = body.mainCate;
        const superlist = body.superCate;
        const sublist = body.subCate;
        var l = [];
        if (list.length > 0) {
            getProductsByMainCategories(list, offset, async (err, result) => {
                if (err) {
                    console.log(err);
                    return;
                }
                var count = result.length;
                var totalPage = Math.ceil(count / 16);

                var li = [];
                for (let i = 0; i < result.length; i++) {
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
                return res.json(
                    { Products: li, TotalProducts: count, TotalPage: totalPage, CurrentProduct: parseInt(offset) }
                );
            });
        } else if (superlist.length > 0) {
            getProductsBySuperCategories(superlist, offset, async (err, result) => {
                if (err) {
                    console.log(err);
                    return;
                }
                var count = result.length;
                var totalPage = Math.ceil(count / 16);

                var li = [];
                for (let i = 0; i < result.length; i++) {
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
                return res.json(
                    { Products: li, TotalProducts: count, TotalPage: totalPage, CurrentProduct: parseInt(offset) }
                );
            });
        } else {
            getProductsBySubCategories(sublist, offset, async (err, result) => {
                if (err) {
                    console.log(err);
                    return;
                }
                var count = result.length;
                var totalPage = Math.ceil(count / 16);

                var li = [];
                for (let i = 0; i < result.length; i++) {
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
                return res.json(
                    { Products: li, TotalProducts: count, TotalPage: totalPage, CurrentProduct: parseInt(offset) }
                );
            });
        }
    },

    getByStore: (req, res) => {
        const body = req.body;
        const offset = req.params.offset;
        getProductsByBrand(body, offset, async (err, results) => {
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
            for (let i = 0; i < results.length; i++) {
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
                { Products: li, TotalProducts: 0 }
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
            for (let i = 0; i < results.length; i++) {
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


    changeSalePrice: (req, res) => {
        const id = req.params.id;
        const price = req.body.price;
        const onSale = req.body.onSale;
        updateSalePrice(id, price, onSale, (err, result) => {
            if (err) {
                return;
            }
            return res.json({ success: 1, message: "Updated Successfully" });
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
    },


    deleteProductByStore: (req, res) => {
        const id = req.params.id;
        const email = req.body.email;
        const password = req.body.password;
        getShopByEmail(email, (err, result) => {
            if (err) {
                return res.json({ success: 0, messgae: "Something is Wrong" });
            }
            if (!result) {
                return res.json({ success: 0, message: "No User Found" });
            }
            var matchPass = compareSync(password, result.password);
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