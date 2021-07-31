const { wishProducts, addProduct, count, removeProduct } = require('./wish.controller');
const router = require('express').Router();

router.get('/:id', wishProducts);
router.post('/', addProduct);
router.get('/count/:id', count);
router.get('/remove/:id', removeProduct);
module.exports = router;