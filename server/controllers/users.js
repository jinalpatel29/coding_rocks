var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = {
    create: function (req, res) {
        console.log("in controller");
        User.create(req.body, function (err, user) {
            if (err) {
                console.log(err);
                res.json({ "status": "error" })
            }
            else {
                console.log("success");
                res.json(user);
            }
        })
    },

    login: function (req, res) {
        console.log("in controller");
        var email = req.body.email;       
        User.findOne({$and:[{ email: email} ,{pwd:req.body.pwd}]}, function (err, user) {
            if (err) {
                res.json({ "status": "Please enter correct username or password" })
            } else {
                console.log("success");
                console.log(user);
                res.json(user);
            }
        })        
    },
    addinterests: function (req, res){
        User.update({_id: req.body.user_id}, { $set: { interests: req.body.result }}, function(err, result){
            if (err){
                console.log(err);
            } else {
                console.log("successfully added model");
            }
        });
    }
}