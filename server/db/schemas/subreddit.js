const mongoose = require('mongoose');
const db = require('../index.js');
mongoose.Promise = global.Promise;

const subredditSchema = new mongoose.Schema({
    subreddit: String,
},
    {
        timestamps: true
    }
);

module.exports.Subreddit = mongoose.model('Subreddit', subredditSchema);