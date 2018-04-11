const mongoose = require('mongoose');
const mongoUri = 'mongodb://localhost/reddit';

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

db.getComments = (postId, callback) => {
    Posts.find({parent: postId}).exec((err, data) => {
        if (err) return callback(err);
        else {
            Posts.find({parent: data[0]._id}).exec((err, data) => {
                callback(err, data);
            })



            // let stack = data.slice();
            // let comments = [];
            
            // while (stack.length > 0) {

            // }
        }
    })
}

module.exports = db;