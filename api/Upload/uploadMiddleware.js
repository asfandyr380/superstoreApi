const util = require("util");
const multer = require("multer");
var path = require('path');

var root = path.dirname(require.main.filename);


var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, root + '/assets/images/Stores');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const uploadImg = multer({ storage: storage }).single('file');
const uploadImageMiddleware = util.promisify(uploadImg);
module.exports =  uploadImageMiddleware;
