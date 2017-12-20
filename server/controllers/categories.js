var mongoose = require('mongoose');
var Category = mongoose.model('Categorie');

module.exports = {
    show: function (req, res) {
        Category.find({}).sort({ createdAt: -1 }).exec(function (err, categories) {
            if (err) {
                res.json({ "status": "error" })
            } else {              
                res.json(categories);
            }
        });
    }
}