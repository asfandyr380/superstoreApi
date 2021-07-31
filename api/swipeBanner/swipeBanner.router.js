const { getSwipeBanners } = require('./swipeBanner.controller');
const router = require('express').Router();


router.get('/', getSwipeBanners);

module.exports = router;