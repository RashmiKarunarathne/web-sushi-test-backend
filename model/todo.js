var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    heading: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        enum: ['done','pending'],
        required: true,
    },
});
var todo = new mongoose.model('todo', schema);
module.exports = todo;