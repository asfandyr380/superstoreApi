const { getBanners, getImage } = require('./banners.controller');
const router = require('express').Router();

router.get('/', getBanners);
router.get('/:image', getImage);
module.exports = router;