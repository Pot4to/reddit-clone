const mongoose = require('mongoose');
const db = require('../index.js');
mongoose.Promise = global.Promise;

const subredditSchema = new mongoose.Schema({
    name: String,
    identification: Number
},
    {
        timestamps: true
    }
);

module.exports.Subreddit = mongoose.model('Subreddit', subredditSchema);