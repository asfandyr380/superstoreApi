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
} = require('./shop.controller');
const router = require('express').Router();
const { checkToken } = require('../../auth/token_validation');

router.post('/', createShop);
router.get('/', getShops);
router.get('/count', count);
router.post('/logo', getShopLogo);
router.post('/upload', upload);
router.get('/:id', checkToken, getShopById);
router.put('/:id', checkToken, updateShop);
router.delete('/:id', deleteShop);
router.post('/login', login);

module.exports = router;