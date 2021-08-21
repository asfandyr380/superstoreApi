const {
    createCategory,
    getCategories,
    generalCategory,
    superCategory,
    subCategory,
    updateSuperCategory,
    deleteCategory,
    createCate,
    addnewSubCate,
    updateProductCategory,
    updateSubCate,
    deleteSuperCate,
    deleteSubCate,
    getAllSuper,
} = require('./category.controller');
const router = require('express').Router();
const { checkToken } = require('../../auth/token_validation');

router.post('/', createCategory);
router.post('/addNode', addnewSubCate);
router.post('/create', createCate);
router.get('/', getCategories);
router.get('/main', generalCategory);
router.get('/super/:id', superCategory);
router.get('/super', getAllSuper);
router.get('/sub/:id', subCategory);
router.put('/super', updateSuperCategory);
router.put('/sub', updateSubCate);
router.put('/:id', updateProductCategory);
router.delete('/:id', deleteCategory);
router.delete('/super/:id', deleteSuperCate);
router.delete('/sub/:id', deleteSubCate);

module.exports = router;