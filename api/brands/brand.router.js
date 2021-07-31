const { route } = require('../users/user.router');
const { getBrands } = require('./brand.controller');
const router = require('express').Router();

router.get('/', getBrands);

module.exports = router;