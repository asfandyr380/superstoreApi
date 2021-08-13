const { 
    createProduct,
    getProducts,
    saleProducts,
    topSelling,
    byCategory,
    updateProduct,
    deleteProduct,
    byPrice,
    search,
    attribute,
    upload,
    uploadAttributeImg,
    getimages,
    getAttributeimages,
    getAll,
    getAttr,
} = require('./product.controller');
const router = require('express').Router();
const { checkToken } = require('../../auth/token_validation');


router.post('/', createProduct);
router.post('/upload', upload);
router.get('/getimage/:image', getimages);
router.get('/', getAll);
router.get('/getAttribute/:id', getAttr);
router.get('/getimg/:image', getAttributeimages);
router.post('/addAttribute', attribute);
router.post('/addAttribute/upload', uploadAttributeImg);
router.get('/:offset', getProducts);
router.post('/byPrice', byPrice);
router.post('/category/:offset', byCategory);
router.get('/onSale/:page', saleProducts);
router.get('/topSelling/:page', topSelling);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.post('/search', search);

module.exports = router;