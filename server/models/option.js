var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OptionSchema = new mongoose.Schema({
    option: {type: String, trim: true, required: true, minlength: [3, 'Option must be greater than 2 characters']},  
    rating: { type: Number,  default: 0 },
    _question: [{type: Schema.Types.ObjectId, ref: 'Question'}]
}, {timestamps: true});

var Option = mongoose.model("Option", OptionSchema);
