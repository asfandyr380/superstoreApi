const { getBanner } = require('./banner.service');
var path = require('path');

var root = path.dirname(require.main.filename);

module.exports = {
    getBanners: (req, res) => {
        getBanner((err, results) => {
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: 'No Banner Found'
                });
            }

            return res.json({
                success: 1,
                data: results
            });
        });
    },

    getImage: (req, res) => {
        var imagePath = req.params.image;
        return res.sendFile(
            path.join(process.cwd() + '/assets/images/Banners/' + imagePath)
        );
    }

};