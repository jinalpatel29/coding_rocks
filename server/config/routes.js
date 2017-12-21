var categories = require('../controllers/categories.js');
var users = require('../controllers/users.js');
var path = require('path');

module.exports = function (app) {
    //get categories
    app.get('/categories', function (req, res) {
        categories.show(req, res);
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

    app.all("*", (req, res, next) => {
        res.sendFile(path.resolve("./angular-app/dist/index.html"))
    });

}