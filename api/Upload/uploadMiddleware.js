const util = require("util");
const multer = require("multer");
var path = require('path');

var root = path.dirname(require.main.filename);

var singleStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, root + '/assets/images/Stores');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const uploadSingleImg = multer({ storage: singleStorage }).single('file');
const uploadImageMiddleware = util.promisify(uploadSingleImg);

module.exports =  uploadImageMiddleware;
