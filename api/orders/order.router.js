const { 
    createOrder,
    getOrders,
    getShopOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
    count,
} = require('./order.controller');
const router = require('express').Router();
const { checkToken } = require('../../auth/token_validation');

router.get('/count', count);
router.post('/', createOrder);
router.get('/', getOrders);
router.get('/shop/:id',checkToken, getShopOrders);
router.get('/:id', checkToken, getOrderById);
router.put('/:id', checkToken, updateOrder);
router.delete('/:id', checkToken, deleteOrder);

module.exports = router;