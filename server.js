var express = require('express');
var app = express();
// var moment = require('moment');

var path = require('path');
var mailer = require('express-mailer');

app.use(express.static(__dirname + '/angular-app/dist'));
app.set('views', __dirname + '/server/views');
app.set('view engine', 'ejs');
var parser = require('body-parser');
app.use(parser.json());
var mongoose = require('mongoose');
require('./server/config/mongoose.js');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

mailer.extend(app, {
    from: 'no-reply@lovefool.com',
    host: 'smtp.gmail.com',
    secureConnection: true, // use SSL 
    port: 465, // port for secure SMTP 
    transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts 
    auth: {
        user: 'lovefoolteam@gmail.com',
        pass: 'codingdojo'
    }
});

app.post('/invite', function (req, res) {   
    console.log("in server invite "); 
    app.mailer.send('email', {
        to: req.body.email,//'example@example.com', // REQUIRED. This can be a comma delimited string just like a normal email to field.  
        subject: 'Lovefool Invite Email', // REQUIRED. 
        otherProperty: 'Other Property' // All additional properties are also passed to the template as local variables. 
    }, function (err) {
        if (err) {
            // handle error 
            console.log(err);
            res.send({"status":"error"});
            // return;
        } else {

            res.send({"status":"success"});
        }
        // res.redirect('/');
    });
})

var routes_setter = require('./server/config/routes.js');

routes_setter(app)
const port = 8000;
// console.log(moment().format('MMMM Do YYYY, h:mm:ss a'));
app.listen(port, () => console.log('Express server listening on port ${port}'));