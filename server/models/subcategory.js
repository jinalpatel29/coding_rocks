var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var subcategorySchema = new mongoose.Schema({
    name: {type: String, trim: true, required: true, minlength: [3, 'Option must be greater than 2 characters']},  
    _category: {type: Schema.Types.ObjectId, ref: 'category'}
}, {timestamps: true});

var Subcategory = mongoose.model("Subcategory", subcategorySchema);
