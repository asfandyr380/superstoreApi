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
    searchAll,
    searchAllByStore,
    searchAllByCate,
    getProductForStore,
    getByStore,
    productCountforStore,
    pendingProductCount,
    pendingProducts,
    changeSalePrice,
    deleteProductByStore,
    searchAllByCateForStore,
    searchAllForStore,
    deleteAttribute,
    changeAttributeStatus,
} = require('./product.controller');
const router = require('express').Router();
const { checkToken } = require('../../auth/token_validation');


router.post('/', createProduct);
router.post('/upload', upload);
router.get('/getimage/:image', getimages);
router.get('/', getAll);
router.get('/pending', pendingProducts);
router.get('/storeCount/:id', productCountforStore);
router.get('/pending/count', pendingProductCount);
router.get('/storeProducts/:id', getProductForStore);
router.get('/searchAll/:key', searchAll);
router.get('/store/searchAll/:key/:id', searchAllForStore);
router.get('/searchAllByStore/:key', searchAllByStore);
router.get('/searchAllByCate/:key', searchAllByCate);
router.get('/store/searchAllByCate/:key/:id', searchAllByCateForStore);
router.get('/getAttribute/:id', getAttr);
router.get('/getimg/:image', getAttributeimages);
router.post('/addAttribute', attribute);
router.post('/addAttribute/upload', uploadAttributeImg);
router.get('/:offset/:limit', getProducts);
router.post('/byPrice', byPrice);
router.post('/category/:offset', byCategory);
router.post('/store/:offset', getByStore);
router.get('/onSale', saleProducts);
router.get('/topSelling', topSelling);
router.put('/:id', updateProduct);
router.put('/salePrice/:id', changeSalePrice);
router.put('/status/:id/:state', changeAttributeStatus);
router.delete('/:id', deleteProduct);
router.delete('/store/:id', deleteProductByStore);
router.delete('/attribute/:id', deleteAttribute);
router.post('/search', search);

module.exports = router;