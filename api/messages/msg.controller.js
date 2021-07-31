const { create, messageCount } = require('./msg.services');

module.exports = {
    createMsg: (req, res) => {
        var data = req.body;
        create(data, (err, result) => {
            if (err) {
                return res.json({ success: 0 });
            }
            return res.json({ success: 1, data: data });
        });
    },

    count: (req, res) => {
        messageCount((err, result) => {
            if (err) {
                res.json({ success: 0, message: "Something Went Wrong" });
            }
            return res.json(result[0]);
        });
    },
};