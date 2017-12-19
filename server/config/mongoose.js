var mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');

var config = require('./config.json');

console.log(config.mongodb.username);

var uri = `mongodb://${config.mongodb.username}:${config.mongodb.password}@codingrocks-shard-00-00-qbt5l.mongodb.net:27017,codingrocks-shard-00-01-qbt5l.mongodb.net:27017,codingrocks-shard-00-02-qbt5l.mongodb.net:27017/testDB?ssl=true&replicaSet=CodingRocks-shard-0&authSource=admin`;
mongoose.connect(uri);

// mongoose.connect('mongodb://localhost/survey_app');
mongoose.connection.on('connected', () => console.log('connected to MongoDB'));
mongoose.Promise = global.Promise;

var models_path = path.join(__dirname, './../models');
fs.readdirSync(models_path).forEach(function(file){
    if(file.indexOf('.js') >= 0){
        require(models_path + '/'+ file);
    }
})