const {reviews} =  require('./review.controller');
const router = require('express').Router();

router.get('/', reviews);

module.exports = router;