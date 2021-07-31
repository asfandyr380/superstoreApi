const {checkOut} = require('./checkout.controller');
const router = require('express').Router();

router.post('/', checkOut);

module.exports = router;