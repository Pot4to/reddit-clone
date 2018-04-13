// import Post from '../../client/src/components/post.js';

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
    Posts.find({_id: ObjectId(postId)}, (err, post) => { // change id to ObjectId(id)
        err ? cb(err) : cb(post);
    });
};

db.getMultiplePosts = (cb) => {
    Posts.find((err, posts) => {
        err ? cb(err) : cb(posts);
    });
};

db.adjustLike = (postId, username, type) => {  // type = 'increment' or 'decrement'
    // check if postId and username exists in likes table
    Likes.find({postId: postId, username: username}, (err, data) => {
        if (data.length > 0) {  // user found
            if (type === data[0].type){ // check if type of like is same
                return false;
            } else {
                data[0].update({type: type}, (err) => { // change type, run findOneAndUpdate
                    Posts.findOneAndUpdate({_id: ObjectId(postId)}, {$inc : {'likes' : type === 'increment' ? 1 : -1}})
                         .exec((err) => err ? console.log('Error updating post likes', err) : null);
                });
            }
        } else {
            // add user to likes table and increment likes for that post
            var newLike = new Likes({
                username: username,
                postId: postId,
                type: type
            });
            newLike.save((err) => {
                if (err) { console.log('Error saving new like', err); }
                Posts.findOneAndUpdate({_id: ObjectId(postId)}, {$inc : {'likes' : type === 'increment' ? 1 : -1}})
                         .exec((err) => err ? console.log('Error updating post likes', err) : null);
            });

        }
    });
};

db.postOnAComment = (parent, username, text, callback) => {
    let post = new Posts({
        username, 
        parent, 
        text,
        title: null,
        url: null,
        subreddit: null,  
    });
    post.save((err) => {
        if (err) return callback(err);
        callback(null);
    })
}

db.postSubreddit = (name, description, callback) => {
    
    let sub = new Subreddit ({
        name,
        description,
    });
    sub.save((err) => {
        if (err) return callback(err);
        callback(null);
    })
}

db.getSubredditPosts = (subredditID, cb) => {
    Posts
      .find({ subreddit: subredditID}, (err, posts) => {
          return err ? cb(err, null) : cb(null, posts);
      });
};

db.subscribeUser = () => {
  
};

module.exports = db;