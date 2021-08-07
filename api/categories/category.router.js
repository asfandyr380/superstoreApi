const {
    createCategory,
    getCategories,
    generalCategory,
    superCategory,
    subCategory,
    updateCategory,
    deleteCategory,
    createCate,
} = require('./category.controller');
const router = require('express').Router();
const { checkToken } = require('../../auth/token_validation');

router.post('/', createCategory);
router.post('/create', createCate);
router.get('/', getCategories);
router.get('/main', generalCategory);
router.get('/super/:id', superCategory);
router.get('/sub/:id', subCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

module.exports = router;