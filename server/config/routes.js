var categories = require('../controllers/categories.js');
var users = require('../controllers/users.js');
var events=require('../controllers/events.js');
var yelp=require('../controllers/yelp.js');
var path = require('path');

module.exports = function (app) {
    //get categories
    app.get('/categories', function (req, res) {
        categories.show(req, res);
    });

    app.put('/addpoints/:id', function (req, res) {
        users.addPoints(req, res);
    });

    //get partner
    app.post('/partner', function(req,res){
        users.findOne(req, res);
    });

    //get partner
    app.post('/partnerinfo', function(req,res){
        users.findPartner(req, res);
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
    app.post('/user/:user_id',function(req,res){users.findOneByID(req,res)});

    //saving / retrieving events from database, called by calendar.service.ts
    app.get('/events/:user_id',events.show);
    app.post('/events/:user_id',events.update);
    app.post('/event', events.createOne);
    //making a yelp query from req.body, returns 1 result, called by yelp.service.ts
    app.post('/yelp/recommendOne',yelp.searchOne);

    app.all("*", (req, res, next) => {
        res.sendFile(path.resolve("./angular-app/dist/index.html"))
    });

}