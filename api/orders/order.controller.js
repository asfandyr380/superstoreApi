require('dotenv').config();
const { create,
    getOrders,
    getShopOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
    getCount,
    searchOrderByUsername,
    searchOrderByPostalcode,
    getstoreOrder,
    getCountforStore,
    updateOrderStatus,
    countUnseenOrders,
    updateSeenStatus,
    checkifOrdered,
} = require('./order.service');
const secretKey = process.env.stripeSecretKey;
const stripe = require("stripe")(secretKey);
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
                message: 'Order placed successfully !',
                data: results,
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


    countStoreOrder: (req, res) => {
        const id = req.params.id;
        getCountforStore(id, (err, result) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json(
                result[0]
            );
        });
    },

    unSeenOrders: (req, res) => {
        countUnseenOrders((err, result) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json(
                result[0]
            );
        });
    },


    updateSeen: (req, res) => {
        const id = req.params.id;
        updateSeenStatus(id, (err, results) => {
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

    storeOrders: (req, res) => {
        const id = req.params.id;
        getstoreOrder(id, (err, results) => {
            if (err) {
                console.log(err);
                return res.json({ success: 0, message: "Database Error" });
            }
            if (results.length !== 0) {
                var tempId = results[0]['orderId']
                var tempUser = results[0]['username'];
                var l = [];
                var li = [];
                var grandTotal = 0;
                var tempcouponNo = results[0]['coupon_No'];
                var tempDiscount = results[0]['discount'];
                var tempPostalCode = results[0]['postal_Code'];
                var tempOrderStatus = results[0]['order_status'];
                var tempSeen = results[0]['seen'];
                for (i = 0; i < results.length; i++) {
                    var item = results[i];
                    var id = item['orderId'];
                    if (id === tempId) {
                        l.push(item);
                        grandTotal = grandTotal + item['grandtotal'];
                    } else {
                        tempId = id;
                        var map = {
                            OrderId: tempId,
                            OrderStatus: tempOrderStatus,
                            Seen: tempSeen,
                            Username: tempUser,
                            Address: item['userAddress'],
                            SubTotal: grandTotal,
                            CouponNo: tempcouponNo,
                            Discount: tempDiscount,
                            Postal_Code: tempPostalCode,
                            GrandTotal: grandTotal,
                            Date: item['date'],
                            result: l
                        };
                        li.push(map);
                        tempcouponNo = item['coupon_No'];
                        tempDiscount = item['discount'];
                        tempUser = item['username'];
                        tempPostalCode = item['postal_Code'];
                        tempOrderStatus = item['order_status'];
                        tempSeen = item['seen'];
                        l = [];
                        l.push(item);
                    }
                }
                var map = {
                    OrderId: tempId,
                    OrderStatus: tempOrderStatus,
                    Seen: tempSeen,
                    Username: tempUser,
                    Address: item['userAddress'],
                    SubTotal: grandTotal,
                    CouponNo: tempcouponNo,
                    Discount: tempDiscount,
                    Postal_Code: tempPostalCode,
                    GrandTotal: grandTotal,
                    Date: item['date'],
                    result: l
                };
                li.push(map);
                return res.json({
                    success: 1,
                    data: li
                });
            } else {
                return res.json({ success: 1, data: results });
            }

        });
    },

    getOrderss: (req, res) => {
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

            if (results.length !== 0) {
                var tempId = results[0]['orderId']
                var tempUser = results[0]['username'];
                var l = [];
                var li = [];
                var grandTotal = 0;
                var tempcouponNo = results[0]['coupon_No'];
                var tempDiscount = results[0]['discount'];
                var tempPostalCode = results[0]['postal_Code'];
                var tempOrderStatus = results[0]['order_status'];
                var tempSeen = results[0]['seen'];
                for (i = 0; i < results.length; i++) {
                    var item = results[i];
                    var id = item['orderId'];
                    if (id === tempId) {
                        l.push(item);
                        grandTotal = grandTotal + item['grandtotal'];
                    } else {
                        tempId = id;
                        var map = {
                            OrderId: tempId,
                            OrderStatus: tempOrderStatus,
                            Seen: tempSeen,
                            Username: tempUser,
                            Address: item['userAddress'],
                            SubTotal: grandTotal,
                            CouponNo: tempcouponNo,
                            Discount: tempDiscount,
                            Postal_Code: tempPostalCode,
                            GrandTotal: grandTotal,
                            Date: item['date'],
                            result: l
                        };
                        li.push(map);
                        tempcouponNo = item['coupon_No'];
                        tempDiscount = item['discount'];
                        tempUser = item['username'];
                        tempPostalCode = item['postal_Code'];
                        tempOrderStatus = item['order_status'];
                        tempSeen = item['seen'];
                        l = [];
                        l.push(item);
                    }
                }
                var map = {
                    OrderId: tempId,
                    orderStatus: tempOrderStatus,
                    Seen: tempSeen,
                    Username: tempUser,
                    Address: item['userAddress'],
                    SubTotal: grandTotal,
                    CouponNo: tempcouponNo,
                    Discount: tempDiscount,
                    Postal_Code: tempPostalCode,
                    GrandTotal: grandTotal,
                    Date: item['date'],
                    result: l
                };
                li.push(map);
                return res.json({
                    success: 1,
                    data: li
                });
            } else {
                return res.json({ success: 1, data: results });
            }
        });
    },


    searchOrder: (req, res) => {
        const key = req.params.key;
        searchOrderByUsername(key, (err, results) => {
            if (err) {
                console.log(err);
                return res.json({ success: 0, message: "Database Error" });
            }
            if (results.length > 0) {
                var tempId = results[0]['orderId']
                var tempUser = results[0]['username'];
                var l = [];
                var li = [];
                var grandTotal = 0;
                var tempcouponNo = results[0]['coupon_No'];
                var tempDiscount = results[0]['discount'];
                var tempPostalCode = results[0]['postal_Code'];
                var tempOrderStatus = results[0]['order_status'];
                var tempSeen = results[0]['seen'];
                for (i = 0; i < results.length; i++) {
                    var item = results[i];
                    var id = item['orderId'];
                    if (id === tempId) {
                        l.push(item);
                        grandTotal = grandTotal + item['grandtotal'];
                    } else {
                        tempId = id;
                        var map = {
                            OrderId: tempId,
                            OrderStatus: tempOrderStatus,
                            Seen: tempSeen,
                            Username: tempUser,
                            Address: item['userAddress'],
                            SubTotal: grandTotal,
                            CouponNo: tempcouponNo,
                            Discount: tempDiscount,
                            Postal_Code: tempPostalCode,
                            GrandTotal: grandTotal,
                            Date: item['date'],
                            result: l
                        };
                        li.push(map);
                        tempcouponNo = item['coupon_No'];
                        tempDiscount = item['discount'];
                        tempUser = item['username'];
                        tempPostalCode = item['postal_Code'];
                        tempOrderStatus = item['order_status'];
                        tempSeen = item['seen'];
                        l = [];
                        l.push(item);
                    }
                }
                var map = {
                    OrderId: tempId,
                    OrderStatus: tempOrderStatus,
                    Seen: tempSeen,
                    Username: tempUser,
                    Address: item['userAddress'],
                    SubTotal: grandTotal,
                    CouponNo: tempcouponNo,
                    Discount: tempDiscount,
                    Postal_Code: tempPostalCode,
                    GrandTotal: grandTotal,
                    Date: item['date'],
                    result: l
                };
                li.push(map);
                return res.json({
                    success: 1,
                    data: li
                });
            } else {
                searchOrderByPostalcode(key, (err, rs) => {
                    if (err) {
                        console.log(err);
                        return res.json({ success: 0, message: "Database Error" });
                    }
                    if (!rs) {
                        return res.json({ success: 0, message: "No Orders Found" });
                    }
                    var tempId = rs[0]['orderId'];
                    var tempUser = rs[0]['username'];
                    var l = [];
                    var li = [];
                    var grandTotal = 0;
                    var tempcouponNo = rs[0]['coupon_No'];
                    var tempDiscount = rs[0]['discount'];
                    var tempPostalCode = rs[0]['postal_Code'];
                    var tempOrderStatus = rs[0]['order_status'];
                    var tempSeen = rs[0]['seen'];
                    for (i = 0; i < rs.length; i++) {
                        var item = rs[i];
                        var id = item['orderId'];
                        if (id === tempId) {
                            l.push(item);
                            grandTotal = grandTotal + item['grandtotal'];
                        } else {
                            tempId = id;
                            var map = {
                                OrderId: tempId,
                                OrderStatus: tempOrderStatus,
                                Seen: tempSeen,
                                Username: tempUser,
                                Address: item['userAddress'],
                                SubTotal: grandTotal,
                                CouponNo: tempcouponNo,
                                Discount: tempDiscount,
                                Postal_Code: tempPostalCode,
                                GrandTotal: grandTotal,
                                Date: item['date'],
                                result: l
                            };
                            li.push(map);
                            tempcouponNo = item['coupon_No'];
                            tempDiscount = item['discount'];
                            tempUser = item['username'];
                            tempPostalCode = item['postal_Code'];
                            tempOrderStatus = item['order_status'];
                            tempSeen = item['seen'];
                            l = [];
                            l.push(item);
                        }
                    }
                    var map = {
                        OrderId: tempId,
                        OrderStatus: tempOrderStatus,
                        Seen: tempSeen,
                        Username: tempUser,
                        Address: item['userAddress'],
                        SubTotal: grandTotal,
                        CouponNo: tempcouponNo,
                        Discount: tempDiscount,
                        Postal_Code: tempPostalCode,
                        GrandTotal: grandTotal,
                        Date: item['date'],
                        result: l
                    };
                    li.push(map);
                    return res.json({
                        success: 1,
                        data: li
                    });
                });
            }
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

    updateStatus: (req, res) => {
        const id = req.params.id;
        const status = req.body.status;
        updateOrderStatus(id, status, (err, results) => {
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
    },

    createPaymentIntent: async (req, res) => {
        const checkoutId = req.body.checkoutId;
        const username = req.body.username;
        const address = req.body.address;
        const postal = req.body.postal;
        const ids = req.body.ids;
        const success_url = `http://localhost:50989/#/Success?id=${checkoutId}&username=${username}&postal=${postal}&address=${address}&ids=${ids}`;
        try {
            const session = await stripe.checkout.sessions.create({
                mode: "payment",
                payment_method_types: ["card"],
                line_items: req.body.items.map(item => {
                    return {
                        price_data: {
                            currency: "usd",
                            product_data: {
                                name: item.name,
                            },
                            unit_amount: item.price * 100,
                        },
                        quantity: item.quantity,
                    }
                }),
                success_url: success_url,
                cancel_url: "http://localhost:3000/#/Cancel",
            });
            return res.json({ success: 1, data: session });
        } catch (error) {
            console.log(error);
            return res.json({ succss: 0, message: error });
        }
    },

    checkifAlreadyOrdered: (req, res) => {
        const id = req.params.id;
        checkifOrdered(id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 1,
                    data: false,
                });
            }
            return res.json({
                success: 1,
                data: true,
            });
        });
    }
}