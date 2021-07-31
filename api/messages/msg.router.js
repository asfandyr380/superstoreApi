const {createMsg, count} = require('./msg.controller');

const router = require('express').Router();

router.post('/', createMsg);
router.get('/count', count);

module.exports = router