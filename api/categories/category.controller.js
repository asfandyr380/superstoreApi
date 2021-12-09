const { json } = require('body-parser');
const { create,
    getCategories,
    getGeneralCate,
    getSuperCate,
    getSubCate,
    updateSuperCategory,
    deleteCategory,
    createNewCatgory,
    updateSubCategory,
    addnewSubCategorys,
    addnewSuperCategorys,
    updateProductCate,
    deleteSuperCate,
    deleteSubCate,
    getAllSuperCate,
    updateGeneralCate,
    getProductCate,
    getAllCate,
} = require('./category.service');
const { getAdminByEmail } = require('../admin/admin.service');
const { genSaltSync, hashSync, compareSync } = require('bcrypt');

module.exports = {
    createCategory: (req, res) => {
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
                message: 'Category saved successfully !',
                data: results
            });
        });
    },

    createCate: (req, res) => {
        const body = req.body;
        createNewCatgory(body, (err, result) => {
            if (err) {
                res.json({ success: 0, message: "Database Error" });
            }
            return res.json({ success: 1, message: "New Category Successfully Added" });
        });
    },


    getCategories: (req, res) => {
        getCategories((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: 'No Category found'
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },

    generalCategory: (req, res) => {
        getGeneralCate((err, result) => {
            if (err) {
                res.json({
                    success: 0,
                    message: "Database Connection Error"
                });
            }
            if (!result) {
                res.json({
                    success: 0,
                    message: "No Category Found"
                });
            }
            return res.json(result);
        });
    },

    getAllSuper: (req, res) => {
        getAllSuperCate((err, result) => {
            if (err) {
                return res.json({ success: 0, message: "Database Error" });
            }
            if (!result) {
                return res.json({ success: 0, message: "Nothing Found in the Database" });
            }
            return res.json({ success: 1, data: result });
        });
    },

    superCategory: (req, res) => {
        var cateId = req.params.id;
        getSuperCate(cateId, (err, result) => {
            if (err) {
                res.json({
                    success: 0,
                    message: "Database Connection Error"
                });
            }
            if (!result) {
                res.json({
                    success: 0,
                    message: "No Category Found"
                });
            }
            return res.json(result);
        });
    },


    subCategory: (req, res) => {
        var cateId = req.params.id;
        getSubCate(cateId, (err, result) => {
            if (err) {
                res.json({
                    success: 0,
                    message: "Database Connection Error"
                });
            }
            if (!result) {
                res.json({
                    success: 0,
                    message: "No Category Found"
                });
            }
            return res.json(result);
        });
    },

    updateGeneralcate: (req, res) => {
        const data = req.body;
        updateGeneralCate(data, (err, result) => {
            if (err) {
                console.log(err);
                return res.json({ success: 0, message: "Database Error" });
            }
            return res.json({ success: 1, message: "Category Updated Successfully" });
        });
    },

    updateProductCategory: (req, res) => {
        const id = req.params.id;
        const body = req.body;
        updateProductCate(id, body, (err, result) => {
            if (err) {
                return res.json({ success: 0, message: "Something Went Wrong" });
            }
            return res.json({ success: 1, message: "Category Updated Succssfully" });
        });
    },


    updateSuperCategory: (req, res) => {
        const body = req.body;
        updateSuperCategory(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: 'Oops something went wrong'
                });
            }
            return res.status(200).json({
                success: 1,
                message: 'Category updated successfully'
            });
        });
    },

    updateSubCate: (req, res) => {
        const body = req.body;
        updateSubCategory(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: 'Oops something went wrong'
                });
            }
            return res.status(200).json({
                success: 1,
                message: 'Category updated successfully'
            });
        });
    },

    addnewSubCate: (req, res) => {
        const body = req.body;
        if (body.superId !== undefined) {
            addnewSubCategorys(body, (err, result) => {
                if (err) {
                    console.log(err);
                    return res.json({ success: 0, message: "Oops Something is Wrong" });
                }
                return res.json({ success: 1, message: "Category Successfully Added" });
            });
        } else if (body.cateId !== undefined) {
            addnewSuperCategorys(body, (err, result) => {
                if (err) {
                    console.log(err);
                    return res.json({ success: 0, message: "Oops Something is Wrong" });
                }
                return res.json({ success: 1, message: "Category Successfully Added" });
            });
        }
        else {
            res.json({ success: 0, message: "Nothing Found" });
        }

    },

    productCate: (req, res) => {
        const id = req.params.id;
        getProductCate(id, (err, result) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({ success: 1, data: result });
        });
    },

    deleteCategory: (req, res) => {
        const id = req.params.id;
        const pass = req.body.password;
        const email = req.body.email;
        getAdminByEmail(email, (err, results) => {
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: 'User not found'
                });
            }
            const result = compareSync(pass, results.pass);
            if (result) {
                results.password = undefined;
                deleteCategory(id, (err, results) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    return res.json({
                        success: 1,
                        data: 'Category deleted successfully'
                    });
                });
            } else {
                return res.json({
                    success: 0,
                    message: 'Password is Wrong'
                });
            }

        });
    },

    deleteSuperCate: (req, res) => {
        const id = req.params.id;
        const pass = req.body.password;
        const email = req.body.email;
        getAdminByEmail(email, (err, results) => {
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: 'User not found'
                });
            }
            const result = compareSync(pass, results.pass);
            if (result) {
                results.password = undefined;
                deleteSuperCate(id, (err, results) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    return res.json({
                        success: 1,
                        data: 'Category deleted successfully'
                    });
                });
            } else {
                return res.json({
                    success: 0,
                    message: 'Password is Wrong'
                });
            }

        });
    },

    deleteSubCate: (req, res) => {
        const id = req.params.id;
        const pass = req.body.password;
        const email = req.body.email;
        getAdminByEmail(email, (err, results) => {
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: 'User not found'
                });
            }
            const result = compareSync(pass, results.pass);
            if (result) {
                results.password = undefined;
                deleteSubCate(id, (err, results) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    return res.json({
                        success: 1,
                        data: 'Category deleted successfully'
                    });
                });
            } else {
                return res.json({
                    success: 0,
                    message: 'Password is Wrong'
                });
            }

        });
    },

    allCate: (req, res) => {
        getAllCate((error, result) => {
            if (error) {
                return res.json({ success: 0, message: "Something went Wrong try again" });
            }
            return res.json({ success: 1, data: result });
        });
    },

}