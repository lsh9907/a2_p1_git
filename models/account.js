// connect mongoose
var mongoose = require('mongoose');
// connect schema to mongoose
var schema = mongoose.Schema;
// connect passport package
var passportLocalMongoose = require('passport-local-mongoose');

// create the account schema
var Account = new schema({
    username: String,
    password: String
});

Account.plugin(passportLocalMongoose);

// make public to the rest of the app
module.exports = mongoose.model('Account', Account);