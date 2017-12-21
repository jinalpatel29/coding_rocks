var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = {
    create: function (req, res) {
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
        var email = req.body.email;
        User.findOne({ $and: [{ email: email }, { pwd: req.body.pwd }] }, function (err, user) {
            if (err) {
                res.json({ "status": "Please enter correct username or password" })
            } else {
                console.log("success");
                console.log(user);
                res.json(user);
            }
        })
    },

    addinterests: function (req, res) {
        User.update({ _id: req.body.user_id }, { $set: { interests: req.body.result } }, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log("successfully added model");
            }
        });
    },

    // invite: function (req, res) {
    //     console.log("in controller");
    //     app.mailer.send('https://www.google.com/', {
    //         to: req.body.email,//'example@example.com', // REQUIRED. This can be a comma delimited string just like a normal email to field.  
    //         subject: 'Lovefool Invite Email', // REQUIRED. 
    //         otherProperty: 'Other Property' // All additional properties are also passed to the template as local variables. 
    //     }, function (err) {
    //         if (err) {
    //             // handle error 
    //             console.log(err);
    //             res.send('There was an error sending the email');
    //             return;
    //         }
    //         res.send('Email Sent');
    //        // res.redirect('/');
    //     });
    // }
}