const mongoose = require('mongoose');
const db = require('../index.js');
mongoose.Promise = global.Promise;

const postSchema = new mongoose.Schema({
    identification: Number,             //ID to be assigned by mongo
    username: String,                   //ID of the username who generated the post
    title: String,                      //Title for post
    text: String,                       //Text for comment or post
    parent: String,                     //ID (self referencing) of the parent post or comment. For posts this will be null.
    url: String,                        //For post, null for comment
    likes: {type: Number, default: 0},  //Linked to the likes table
    subreddit: String,                  //ID of subreddit
},
    {
        timestamps: true
    }
);

module.exports.Posts = mongoose.model('Posts', postSchema);