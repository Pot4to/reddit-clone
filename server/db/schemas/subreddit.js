const mongoose = require('mongoose');
const db = require('../index.js');
mongoose.Promise = global.Promise;

const subredditSchema = new mongoose.Schema({
    identification: Number,
    name: String,
    description: String,
},
    {
        timestamps: true
    }
);

const Subreddit = mongoose.model('Subreddit', subredditSchema);

module.exports = Subreddit;