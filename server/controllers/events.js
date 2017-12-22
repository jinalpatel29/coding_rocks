var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = {
    show: function (req, res) {
        User.findOne({_id:req.params.user_id}).exec(function (err, user) {
            if (err) {
                // res.json({ "status": "error" })
            } else {  
                // console.log(user);
                console.log('retrieving events for: ',user.firstName)            ;
                // res.json(categories);
                user.events.sort(function(a, b) {
                    return new Date(b.date) - new Date(a.date);
                });
                res.json(user.events);
            }
        });
    },
    update:function(req,res){
        console.log(`saving ${req.body.events.length} events`);
        User.update({_id:req.params.user_id},{events:req.body.events},function(err,user){
            if(err){
                console.log('update events err: ',err);                
            }else{
                console.log(`for: ${user.firstName}`) 
                res.json({})               
            }
            // console.log('user: ',user)
        });
    },
    createOne:function(req,res){
        return;
    },
}