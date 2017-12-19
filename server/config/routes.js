var questions = require('../controllers/questions.js');
var categories = require('../controllers/categories.js');
var path = require('path');

module.exports = function(app){
    app.get('/all', function(req,res){
        questions.show(req,res);
    });

    //get categories
    app.get('/categories', function(req, res){
        categories.show(req, res);
    });

    app.post('/create', function(req,res){   
        console.log("in routes");    
        questions.create(req,res);
    })

    app.put('/option/:id', function(req,res){
        console.log("in routes");
        questions.updateRating(req,res);
    })

    app.get('/question/:id', function(req,res){
        questions.findQuestion(req,res);
    });

    app.put('/note/:id', function(req,res){
        questions.update(req,res);
    });

    app.delete('/question/:id', function(req,res){
        questions.destroy(req,res);
    });

    app.all("*", (req, res, next) => {
        res.sendFile(path.resolve("./angular-app/dist/index.html"))
    });

}