var express = require('express');
var app = express();

var path = require('path');
// var cors = require('cors');
// app.use(cors());
app.use(express.static(__dirname + '/angular-app/dist'));

var parser = require('body-parser');
app.use(parser.json());
app.use(parser.urlencoded({extended: true}));

var mongoose = require('mongoose');
require('./server/config/mongoose.js');

var routes_setter = require('./server/config/routes.js');

app.all("*", (req, res, next) => {
    res.sendFile(path.resolve("./angular-app/dist/index.html"))
});
routes_setter(app)
const port = 8000;
app.listen(port, ()=> console.log('Express server listening on port ${port}'));