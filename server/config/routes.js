var categories = require('../controllers/categories.js');
var users = require('../controllers/users.js');
var events=require('../controllers/events.js');
var path = require('path');

module.exports = function (app) {
    //get categories
    app.get('/categories', function (req, res) {
        categories.show(req, res);
    });

    //get partner
    app.post('/partner', function(req,res){
        users.findOne(req, res);
    });

    //post get a link requests for specified user
    app.post('/partner/requests', function(req, res){
        users.getRequestedUsers(req, res);
    });

    //link accounts
    app.post('/link', function(req, res){
        users.linkAccount(req, res);
    });

    //add a link request to specified partner
    app.put('/request/:id', function(req,res){
        users.addRequest(req, res);
    });

    app.post('/create', function(req,res){   
        console.log("in routes");    
        questions.create(req,res);
    });

    app.post('/interests', function(req,res){
        users.addinterests(req,res);
    });

    app.post('/createUser', function(req,res){ 
        users.create(req,res);
    });

    app.post('/login', function(req,res){          
        users.login(req,res);
    });

    app.put('/option/:id', function(req,res){
        console.log("in routes");
        questions.updateRating(req,res);
    });
    app.post('/interests', function (req, res) {
        users.addinterests(req, res);
    });

    app.post('/createUser', function (req, res) {
        users.create(req, res);
    })

    app.post('/login', function (req, res) {
        users.login(req, res);
    })

    app.get('/events/:user_id',events.show);
    app.post('/events/:user_id',events.update);
    app.post('/event', events.createOne);

    app.all("*", (req, res, next) => {
        res.sendFile(path.resolve("./angular-app/dist/index.html"))
    });

}