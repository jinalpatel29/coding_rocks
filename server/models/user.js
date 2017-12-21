var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    pwd: {type: String, required: true},
    address1: {type: String, default: ""},
    address2: {type: String, default: ""},
    dob: {type: Date},
    point: {type: Number, default: 0},
<<<<<<< HEAD
    events:[],
=======
    interests: [],
>>>>>>> 3b0985621bb322b061a1e3be355a593158be51ac
    _partner: {type: Schema.Types.ObjectId, ref: 'User'}
}, {timestamps: true});

var User = mongoose.model('User', UserSchema);
