const { request } = require('express');
const { create,
    getOrders,
    getShopOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
    getCount
} = require('./order.service');

module.exports = {
    createOrder: (req, res) => {
        const body = req.body;
        create(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: 'Database connection failed'
                });
            }
            return res.status(200).json({
                success: 1,
                message: 'Order placed successfully !'
            });
        });
    },
    count: (req, res) => {
        getCount((err, result) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json(
                result[0]
            );
        });
    },
    getOrders: (req, res) => {
        getOrders((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: 'No Orders Were found'
                });
            }
            var tempId = results[0]['orderId']
            var tempUser = results[0]['username'];
            var l = [];
            var li = [];
            for (i = 0; i < results.length; i++) {
                var item = results[i];
                var id = item['orderId'];
                if (id === tempId) {
                    l.push(item);
                } else {
                    tempId = id;
                    var map = { User: tempUser, result: l };
                    li.push(map);
                    tempUser = item['username'];
                    l = [];
                    l.push(item);
                }
            }
            var map = {User: tempUser, result: l};
            li.push(map);
            return res.json({
                success: 1,
                data: li
            });
        });
    },
    getShopOrders: (req, res) => {
        const id = req.params.id;
        getShopOrders(id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: 'No order found'
                });
            }
            return res.json(
                results
            );
        });
    },
    getOrderById: (req, res) => {
        const id = req.params.id;
        getOrderById(id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: 'Category not found'
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    updateOrder: (req, res) => {
        const id = req.params.id;
        const body = req.body;
        updateOrder(id, body, (err, results) => {
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
    deleteOrder: (req, res) => {
        const id = req.params.id;
        deleteOrder(id, (err, results) => {
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