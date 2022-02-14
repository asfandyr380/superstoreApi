const { checkOut, updateStatus } = require('./checkout.controller');
const router = require('express').Router();

router.post('/', checkOut);
router.post('/update', updateStatus);

module.exports = router;