var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = new Schema({
    username: {type: String},
    password: {type: String},
    email: {type: String},
    registered:  {type: Date},
    lastLogin: {type: Date},
    profile: {type: String}
});

var User = mongoose.model('User', userSchema);

module.exports = User;