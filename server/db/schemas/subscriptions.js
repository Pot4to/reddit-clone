const mongoose = require('mongoose');
const db = require('../index.js');
mongoose.Promise = global.Promise;

const subscriptionSchema = new mongoose.Schema({
    identification: Number,
    username: String,                   //username
    subredditId: String,                //id of subreddit that the user is subscribed to
},
    {
        timestamps: true
    }
);

const Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = Subscription;