const {byCart, deleteCart, toCart, count, updateCart} = require('./cart.controller');
const router = require('express').Router();


router.get('/:id', byCart);
router.delete('/:id', deleteCart);
router.post('/add/', toCart);
router.get('/count/:id', count);
router.put('/update', updateCart);

module.exports = router;