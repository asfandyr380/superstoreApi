const { create,
    getShops,
    getShopById,
    updateShop,
    deleteShop,
    getShopByEmail,
    getShopCount,
    updateStore,
    updateStoreStatus,
} = require('./shop.service');
const uploadImageMiddleware = require('../Upload/uploadMiddleware');
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');
var path = require('path');

var root = path.dirname(require.main.filename);
module.exports = {
    createShop: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
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
                message: "Account created successfully",
                data: results
            });
        });
    },
    count: (req, res) => {
        getShopCount((err, result) => {
            if (err) {
                return res.json({ success: 0, message: "Something Went Wrong" });
            }
            return res.json(result[0]);
        });
    },

    getShopLogo: (req, res) => {
        var imagePath = req.body.path;
        return res.sendFile(
           root = 'assets/images/Stores' + imagePath
        );
    },

    upload: async (req, res) => {
        try {
            await uploadImageMiddleware(req, res);
            console.log(req.file);
            if (req.file == undefined) {
                return res.status().send({ message: "Please Upload an Image" });
            }
            res.status(200).send(req.file['filename']);
        } catch (err) {
            console.log(err);
        }

    },

    getShops: (req, res) => {
        getShops((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: 'No User found'
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    getShopById: (req, res) => {
        const id = req.params.id;
        getShopById(id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: 'User not found'
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },

    updateStatus: (req, res) => {
        const id = req.params.id;
        const status = req.params.status;
        updateStoreStatus(id, status, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: 'Oops something went wrong'
                });
            }
            return res.status(200).json({
                success: 1,
                message: 'Status updated successfully'
            });
        });
    },

    updateShop: (req, res) => {
        const id = req.params.id;
        const body = req.body;
        updateStore(id, body, (err, results) => {
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
            //         message: 'No User found'
            //     });
            // }
            return res.status(200).json({
                success: 1,
                message: 'Store updated successfully'
            });
        });
    },
    deleteShop: (req, res) => {
        const id = req.params.id;
        const pass = req.body.password;
        const body = req.body.email;
        getShopByEmail(body ,(err, result) => {
            
        });
        deleteShop(id, (err, results) => {
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
                data: 'User deleted successfully'
            });
        });
    },
    login: (req, res) => {
        const body = req.body;
        getShopByEmail(body.email, (err, results) => {
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: 'User not found'
                });
            }
            const result = compareSync(body.password, results.password);
            if (result) {
                results.password = undefined;
                const jsontoken = sign({ result: results }, 'qwe1234', {
                    expiresIn: '12h'
                });
                return res.json({
                    success: 1,
                    message: 'Login successfully',
                    token: jsontoken,
                    data: results
                });
            } else {
                return res.json({
                    success: 0,
                    message: 'Email or password incorrect'
                });
            }
        });
    }
}