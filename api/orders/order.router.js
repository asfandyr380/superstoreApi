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
    countStoreOrder,
    updateStatus,
    unSeenOrders,
    updateSeen,
} = require('./order.controller');
const router = require('express').Router();
const { checkToken } = require('../../auth/token_validation');

router.get('/count', count);
router.get('/unseen/count', unSeenOrders);
router.get('/search/:key', searchOrder);
router.post('/', createOrder);
router.get('/', getOrders);
router.get('/storeCount/:id', countStoreOrder);
router.get('/store/:id', storeOrders);
router.get('/shop/:id',checkToken, getShopOrders);
router.get('/:id', checkToken, getOrderById);
// router.put('/:id', checkToken, updateOrder);
router.put('/:id', updateStatus);
router.put('/unseen/:id', updateSeen);
router.delete('/:id', checkToken, deleteOrder);

module.exports = router;