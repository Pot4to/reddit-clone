// import Post from '../../client/src/components/post.js';

const mongoose = require('mongoose');
const mongoUri = 'mongodb://localhost/reddit';
const ObjectId = require('mongoose').Types.ObjectId;

//Schemas
const User = require('./schemas/user.js');
const Subreddit = require('./schemas/subreddit.js');
const Posts = require('./schemas/posts.js');
const Subscription = require('./schemas/subscriptions.js');
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
    Posts.find({parent: null}, (err, posts) => {
        err ? cb(err) : cb(posts);
    });
};

db.adjustLike = (postId, username, postOwner, type) => {  // type = 'increment' or 'decrement'
    // check if postId and username exists in likes table
    Likes.find({postId: postId, username: username}, (err, data) => {
        if (data.length > 0) {  // user found
            if (type === data[0].type){ // check if type of like is same
                return false;
            } else {
                data[0].update({type: type}, (err) => { // change type, run findOneAndUpdate


                    Posts.findOneAndUpdate({_id: ObjectId(postId)}, { $inc : {'likes' : type === 'increment' ? 1 : -1 }})
                    .exec((err) => {
                        if (err) return console.log('Error updating post likes', err);
                        User.findOneAndUpdate({ username: postOwner }, { $inc : {'userKarma' : type === 'increment' ? 1 : -1 }})
                        .exec((err) => {
                            err ? console.log('Error updating user karma', err) : null;
                        })

                    
                    
                    
                    //need to update the user karma for the user who posted the liked or disliked post 
                    //above updated the likes count on the post
                    
                    //update likes count on the postOwner


                    });
                })
            }
        } else {
            // add user to likes table and increment likes for that post
            // need to add: increment user karma for the user who posted the liked post
            var newLike = new Likes({
                username: username,
                postId: postId,
                type: type
            });
            newLike.save((err) => {
                if (err) { console.log('Error saving new like', err); }


                Posts.findOneAndUpdate({_id: ObjectId(postId)}, {$inc : {'likes' : type === 'increment' ? 1 : -1}})
                .exec((err) => {
                    if (err) return console.log('Error updating post likes', err);
                    User.findOneAndUpdate({ username: postOwner }, { $inc: { 'userKarma': type === 'increment' ? 1 : -1 } })
                        .exec((err) => {
                            err ? console.log('Error updating user karma', err) : null;
                        })
                })
                    //above incremented like count on post


                    //increment likes count on the post owner
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

db.postSubreddit = (name, description, image, callback) => {
    
    let sub = new Subreddit ({
        name,
        description,
        image, 
    });
    sub.save((err) => {
        if (err) return callback(err);
        callback(null);
    })
}

db.savePost = (post) => {
    const newPost = new Posts(post);
    newPost.save((err) => err ? console.log('Error saving new post', err) : null);
};


db.getSubredditPosts = (subredditID, cb) => {
    console.log('inside db index', subredditID)
    Posts
      .find({ subReddit: subredditID}, (err, posts) => {
          return err ? cb(err, null) : cb(null, posts);
      });
};

db.subscribeUser = (subredditId, userId, cb) => {
    const newSub = new Subscription({
      username: userId,
      postId: subredditId
    });
    newSub
      .save((err) => {
         if (err) {
           return cb(err);
         }
      });
    
};

db.getSubreddits = (callback) => {
    Subreddit.find({}, (err, data) => {
        if (err) return callback(err);
        callback(null, data);
    })
}


module.exports = db;