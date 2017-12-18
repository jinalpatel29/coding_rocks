var mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { Schema } = mongoose;
console.log("in models");
var QuestionSchema = new Schema({
    question: {type: String, trim: true, required: [true, 'Question is required'], minlength: [8, 'Question must be greater than 5 characters'],
    },
    author: { type: String, required: [true, 'Author name is required'], minlength: [2, 'Author name must be greater than 5 charaters']},  
    _options: [{ type: Schema.Types.ObjectId, ref: 'Option' }]
    }, {timestamps: true ,  usePushEach: true });

QuestionSchema.plugin(uniqueValidator, { message: '{PATH} must be unique.' });
var Question = mongoose.model('Question', QuestionSchema);