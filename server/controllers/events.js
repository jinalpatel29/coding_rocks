var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = {
    show: function (req, res) {
        User.findOne({firstName:"Jonathan"}).exec(function (err, user) {
            if (err) {
                // res.json({ "status": "error" })
            } else {  
                // console.log(user);
                console.log('retrieving')            ;
                // res.json(categories);
                res.json(user.events);
            }
        });
    },
    update:function(req,res){
        console.log('saving events:',req.body.events.length);
        User.update({firstName:"Jonathan"},{events:req.body.events},function(err,user){
            if(err){
                console.log('update events err: ',err);                
            }
            // console.log('user: ',user)
        });
    },
    createOne:function(req,res){
        return;
    },
}