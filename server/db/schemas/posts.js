const mongoose = require('mongoose');
const db = require('../index.js');
const ObjectId = require('mongoose').Types.ObjectId;
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

const Posts = mongoose.model('Posts', postSchema);

const getOne = (postId, cb) => {
    Posts.find({_id: ObjectId(postId)}, (err, post) => {
        err ? console.log(err) : cb(post);
    });
};

const adjustLike = (postId, incBool) => {  // pass true to increment
    Posts.findOneAndUpdate({_id: postId}, {$inc : {'likes' : incBool ? 1 : -1}})
         .exec((err, data) => err ? console.log('Error updating post likes', err) : console.log('Succesful increment of likes'));
};


module.exports.Posts = Posts;
module.exports.getOne = getOne;
