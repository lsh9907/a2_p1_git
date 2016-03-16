// link to mongoose
var mongoose = require('mongoose');

// define the article schema
var articleSchema = new mongoose.Schema({
    number: {
        type: Number,
        default: ''
    },
    location: {
        type: String,
        default: ''
    },
    owner: {
        type: String,
        default: ''
    },
    employees: {
        type: Number,
        default: ''
    },
    rate: {
        type: Number,
        default: ''
    }
});

// make this public
module.exports = mongoose.model('Branch', articleSchema);
