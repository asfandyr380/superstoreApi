const { 
    createShop,
    getShops,
    getShopById,
    updateShop,
    deleteShop,
    login,
    upload,
    getShopLogo,
    count,
    updateStatus,
} = require('./shop.controller');
const router = require('express').Router();
const { checkToken } = require('../../auth/token_validation');

router.post('/', createShop);
router.get('/', getShops);
router.put('/:id/:status', updateStatus);
router.get('/count', count);
router.get('/logo/:name', getShopLogo);
router.post('/upload', upload);
router.get('/:id', checkToken, getShopById);
router.put('/:id', updateShop);
router.delete('/:id', deleteShop);
router.post('/login', login);

module.exports = router;