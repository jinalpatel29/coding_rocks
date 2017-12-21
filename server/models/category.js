var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new mongoose.Schema({
    name: {type: String, trim: true, required: true, minlength: [3, 'Option must be greater than 2 characters']},  
    subcategories: [],
    src: String
}, {timestamps: true});

var Category = mongoose.model("Categorie", categorySchema);
