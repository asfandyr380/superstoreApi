const {createMsg, count, get} = require('./msg.controller');

const router = require('express').Router();

router.post('/', createMsg);
router.get('/count', count);
router.get('/', get);

module.exports = router