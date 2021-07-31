const { 
    createProduct,
    getProducts,
    saleProducts,
    topSelling,
    byCategory,
    updateProduct,
    deleteProduct,
    byPrice,
    search
} = require('./product.controller');
const router = require('express').Router();
const { checkToken } = require('../../auth/token_validation');


router.post('/', createProduct);
router.get('/:offset', getProducts);
router.post('/byPrice', byPrice);
router.post('/category/:offset', byCategory);
router.get('/onSale/:page', saleProducts);
router.get('/topSelling/:page', topSelling);
router.put('/:id', checkToken, updateProduct);
router.delete('/:id', checkToken, deleteProduct);
router.post('/search', search);

module.exports = router;