const {createMsg, count, get, updateStatus} = require('./msg.controller');

const router = require('express').Router();

router.post('/', createMsg);
router.get('/count', count);
router.get('/', get);
router.put('/:id', updateStatus);

module.exports = router