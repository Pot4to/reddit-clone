const mongoose = require('mongoose');
const db = require('../index.js');
mongoose.Promise = global.Promise;

const postSchema = new mongoose.Schema({
    author: String,
    likes: { type: Number, default: 0 },
    url: String,
    subreddit: String,
},
    {
        timestamps: true
    }
);

module.exports.Post = mongoose.model('Post', postSchema);
