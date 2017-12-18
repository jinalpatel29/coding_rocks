var mongoose = require('mongoose');
var Question = mongoose.model('Question');
var Option = mongoose.model('Option');

module.exports = {
    show: function (req, res) {
        Question.find({}).sort({ createdAt: -1 }).exec(function (err, questions) {
            if (err) {
                res.json({ "status": "error" })
            } else {
                console.log("in show questions");
                console.log(questions);
                res.json(questions);
            }
        });
    },

    create: function (req, res) {
        var options = req.body.options;
        var question = new Question(req.body);
        question.save(function (err, que) {
            if (err) {
                console.log(err);
            } else {
                for (let opt of options) {
                    var option = new Option();
                    option.option = opt;
                    option._question = question._id;
                    option.save(function (err, newopt) {
                        console.log("in option save");
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(newopt);
                        }
                    })
                    question._options.push(option);
                }
                question.save(function (err) {
                    if (err) {
                        res.json({ "status": "error" })
                    } else {
                        res.json(question);
                    }
                })
            }
        })
    },

    updateRating: function (req, res) {
        console.log("in controller");
        console.log(req.body);
        Option.findByIdAndUpdate(req.params.id, { rating: req.body.rating }, function (err, option) {
            if (err) {
                res.json({ "status": "error" })
            } else {
                res.json(option);
            }
        })
    },

    findQuestion: function (req, res) {
        Question.findOne({ _id: req.params.id }, function (err, question) {
            if (err) {
                res.json({ "status": "error" })
            } else {
                Option.find({ _question: question._id }, function (err, options) {
                    if (err) {
                        res.json({ "status": "error" })
                    } else {
                        console.log(options);
                        res.json(options);
                    }
                })
            }
        });
    },

    update: function (req, res) {
        Question.findByIdAndUpdate(req.params.id, { text: req.body.text, author: req.body.author }, function (err, question) {
            if (err) {
                res.json({ "status": "error" })
            } else {
                res.json(question);
            }
        })
    },

    destroy: function (req, res) {
        console.log("In controllers")
        Question.remove({ _id: req.params.id }, function (err, question) {
            if (err) {
                console.log(err);
                res.json({ "status": "error" })
            } else {
                res.json(question);
            }
        })
    }
}