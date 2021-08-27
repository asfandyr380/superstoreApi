const { create,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    getUserByEmail,
    updatePassword,
    updateVerificationStatus,
} = require('./user.service');

const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');
const nodemailer = require('nodemailer');

module.exports = {
    createUser: (req, res) => {
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
            if (results == "Email Already Exists") {
                return res.status(404).json({
                    success: 0,
                    message: 'Email Already Exists'
                });
            }
            var val = Math.floor(1000 + Math.random() * 9000);
            
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'asfandyr380@gmail.com',
                    pass: 'gvplurnwpqkvopfb'
                }
            });
            var mailOptions = {
                from: 'info@gmail.com',
                to: body.email,
                subject: 'Sending Email using Node.js',
                text: 'Your Verification Code is ' + val
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            return res.status(200).json({
                success: 1,
                message: "Account created successfully",
                code: val,
                data: results
            });
        });
    },
    getUsers: (req, res) => {
        getUsers((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: 'No User not found'
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    getUserById: (req, res) => {
        const id = req.params.id;
        getUserById(id, (err, results) => {
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
    updateUser: (req, res) => {
        const id = req.params.id;
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateUser(id, body, (err, results) => {
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
            return res.status(200).json({
                success: 1,
                message: 'User updated successfully'
            });
        });
    },
    deleteUser: (req, res) => {
        const id = req.params.id;
        deleteUser(id, (err, results) => {
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
                data: 'User deleted successfully'
            });
        });
    },


    loginWithGoogle: (req, res) => {
        const email = req.body.email;
        getUserByEmail(email, (err, result) => {
            if (err) {
                console.log(err);
            }
            if (!result) {
                return res.json({
                    success: 0,
                    message: 'User not found, please signup to access our services'
                });
            }
            return res.json({
                success: 1,
                message: 'Login successfully',
                data: result
            });
        });
    },

    byEmail: (req, res) => {
        const body = req.body;
        getUserByEmail(body.email, (err, results) => {
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: 'User not found, please signup to access our services'
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },

    login: (req, res) => {
        const body = req.body;
        getUserByEmail(body.email, (err, results) => {
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: 'User not found, please signup to access our services'
                });
            }
            const result = compareSync(body.password, results.password);
            if (result) {
                results.password = undefined;
                const jsontoken = sign({ result: results }, 'qwe1234', {
                    expiresIn: '24h'
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
    },

    forgotPassword: (req, res) => {
        const body = req.body;
        const id = req.params.id;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        getUserById(id, (err, results) => {
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: 'User not found, please signup to access our services'
                });
            }
            const result = compareSync(body.oldPassword, results.password);
            if (result) {
                results.oldPassword = undefined;
                updatePassword(body.password, id, (err, result) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    return res.json({
                        success: 1,
                        message: 'Password Changed Successfully',
                    });
                });

            } else {
                return res.json({
                    success: 0,
                    message: 'password incorrect'
                });
            }
        });
    },

    updateVerify: (req, res) => {
        const id = req.params.id;
        updateVerificationStatus(id, (err, result) => {
            if(err)
            {
                console.log(err);
                return;
            }
            return res.json({success: 1, message: "Status Updated"});
        });
    },


}