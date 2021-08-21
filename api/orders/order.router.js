const { 
    createOrder,
    getOrders,
    getShopOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
    count,
    searchOrder,
    storeOrders,
} = require('./order.controller');
const router = require('express').Router();
const { checkToken } = require('../../auth/token_validation');

router.get('/count', count);
router.get('/search/:key', searchOrder);
router.post('/', createOrder);
router.get('/', getOrders);
router.get('/storeOrder/:id', storeOrders);
router.get('/shop/:id',checkToken, getShopOrders);
router.get('/:id', checkToken, getOrderById);
router.put('/:id', checkToken, updateOrder);
router.delete('/:id', checkToken, deleteOrder);

module.exports = router;