const mongoose = require('mongoose');
const db = require('../index.js');
mongoose.Promise = global.Promise;

const commentSchema = new mongoose.Schema({
    author: String, 
    likes: {type: Number, default: 0}, 
    text: String, 
    parent: String, 
    children: [{type: String}],
    post: String,
},
    {
        timestamps: true
    }
);

module.exports.Comment = mongoose.model('Comment', commentSchema);