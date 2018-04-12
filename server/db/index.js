const mongoose = require('mongoose');
const mongoUri = 'mongodb://localhost/reddit';
const ObjectId = require('mongoose').Types.ObjectId;

//Schemas
const User = require('./schemas/user.js');
const Subreddit = require('./schemas/subreddit.js');
const Posts = require('./schemas/posts.js');
const Subscriptions = require('./schemas/subscriptions.js');
const Likes = require('./schemas/likes.js');

const db = mongoose.connect(mongoUri);

db.recursiveGetComments = (postId, callback) => {

    let children = [];
    let stack = [{_id: postId}];

    let loop = (callback) => {
        if (stack.length > 0) {
            let post = stack.pop();
            Posts.find({parent: post._id}).exec((err, data) => {
                if (err) {
                    return callback(err);
                } else if (data.length > 0) {
                    children = children.concat(data);
                    stack = stack.concat(data);
                    loop(callback);
                } else {
                    if (stack.length > 0) {
                        loop(callback);
                    } else if (stack.length === 0) {
                        callback(null, children);
                    }
                }
            })
        }
    }
    loop(callback);
}

db.getOnePost = (postId, cb) => {
    Posts.find({_id: ObjectId(postId)}, (err, post) => {
        err ? cb(err) : cb(post);
    });
};

db.adjustLike = (postId, username, type) => {  // type = 'increment' or 'decrement'
    // check if postId and username exists in likes table
    Likes.find({postId: postId, username: username}, (err, data) => {
        if (data.length > 0) {  // user found
            // check if type of like is same
            if (type === data[0].type){
                return false;
            } else {
                // change type, run findOneAndUpdate
                user.update({type: type}, (err) => {
                    Posts.findOneAndUpdate({_id: postId}, {$inc : {'likes' : type === 'increment' ? 1 : -1}})
                         .exec((err) => err ? console.log('Error updating post likes', err) : null);
                });
            }
        } else {
            // add user to likes table and
            
        }
    });
};

module.exports = db;