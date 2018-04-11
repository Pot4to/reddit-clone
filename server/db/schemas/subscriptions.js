const mongoose = require('mongoose');
const db = require('../index.js');
mongoose.Promise = global.Promise;

const subscriptionSchema = new mongoose.Schema({
    identification: Number,
    username: String,           //username
    postId: String,             //comment or post that the user liked
},
    {
        timestamps: true
    }
);

module.exports.Subscription = mongoose.model('Subscription', subscriptionSchema);