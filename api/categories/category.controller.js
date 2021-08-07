const { create,
    getCategories,
    getGeneralCate,
    getSuperCate,
    getSubCate,
    updateCategory,
    deleteCategory,
    createNewCatgory,
} = require('./category.service');

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

    updateCategory: (req, res) => {
        const id = req.params.id;
        const body = req.body;
        updateCategory(id, body, (err, results) => {
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
                message: 'Category updated successfully'
            });
        });
    },
    deleteCategory: (req, res) => {
        const id = req.params.id;
        deleteCategory(id, (err, results) => {
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
                data: 'Category deleted successfully'
            });
        });
    }
}