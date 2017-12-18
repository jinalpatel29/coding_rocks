var questions = require('../controllers/questions.js')
var path = require('path');
module.exports = function(app){
    app.get('/all', function(req,res){
        questions.show(req,res);
    })

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
    })

    app.put('/note/:id', function(req,res){
        questions.update(req,res);
    })

    app.delete('/question/:id', function(req,res){
        questions.destroy(req,res);
    })

}