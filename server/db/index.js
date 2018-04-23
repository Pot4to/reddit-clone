const mongoose = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId;

//Schemas
const User = require('./schemas/user.js');
const Subreddit = require('./schemas/subreddit.js');
const Posts = require('./schemas/posts.js');
const Subscription = require('./schemas/subscriptions.js');
const Likes = require('./schemas/likes.js');

//Connect to heroku mongodb or local db
const db = mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/reddit");

db.recursiveGetComments = (postId, cb) => {

    let children = [];
    let stack = [{_id: postId}];

    let loop = (cb) => {
        if (stack.length > 0) {
            let post = stack.pop();
            Posts.find({parent: post._id}).exec((err, data) => {
                if (err) {
                    return cb(err);
                } else if (data.length > 0) {
                    children = children.concat(data);
                    stack = stack.concat(data);
                    loop(cb);
                } else {
                    if (stack.length > 0) {
                        loop(cb);
                    } else if (stack.length === 0) {
                        cb(null, children);
                    }
                }
            })
        }
    }
    loop(cb);
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
                var action = ['increment', 'decrement'].includes(data[0].type) ? 'none' : type;
                data[0].update({type: action}, (err) => { // change type, run findOneAndUpdate
                    // update likes count on posts
                    Posts.findOneAndUpdate({_id: ObjectId(postId)}, { $inc : {'likes' : type === 'increment' ? 1 : -1 }})
                    .exec((err) => {
                        if (err) return console.log('Error updating post likes', err);
                        // now update likes count on the owner of the post
                        User.findOneAndUpdate({ username: postOwner }, { $inc : {'userKarma' : type === 'increment' ? 1 : -1 }})
                        .exec((err) => {
                            err ? console.log('Error updating user karma', err) : null;
                        });
                    });
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
                //above incremented like count on post
                Posts.findOneAndUpdate({_id: ObjectId(postId)}, {$inc : {'likes' : type === 'increment' ? 1 : -1}})
                .exec((err) => {
                    if (err) return console.log('Error updating post likes', err);
                    //increment likes count on the post owner
                    User.findOneAndUpdate({ username: postOwner }, { $inc: { 'userKarma': type === 'increment' ? 1 : -1 } })
                    .exec((err) => {
                        err ? console.log('Error updating user karma', err) : null;
                    })
                });
            });
        }
    });
};

db.postOnAComment = (parent, username, text, cb) => {
    let post = new Posts({
        username, 
        parent, 
        text,
        title: null,
        url: null,
        subreddit: null,  
    });
    post.save((err) => {
        if (err) return cb(err);
        cb(null);
    })
}

db.postSubreddit = (name, description, image, cb) => {
    
    let sub = new Subreddit ({
        name,
        description,
        image, 
    });
    sub.save((err) => {
        if (err) return cb(err);
        cb(null);
    })
}

db.savePost = (post, cb) => {
    const newPost = new Posts(post);
    newPost.save((err) => {
        if (err) return cb(err);
        cb(null);
    });
};


db.getSubredditPosts = (subredditID, cb) => {
    Posts
      .find({ subReddit: subredditID}, (err, posts) => {
          return err ? cb(err, null) : cb(null, posts);
      });
};

db.subscribeUser = (subredditId, username, cb) => {
    const newSub = new Subscription({
      username: username,
      postId: subredditId
    });
    newSub
      .save((err) => {
         if (err) {
           return cb(err);
         }
      });
    
};

db.getSubreddits = (cb) => {
    Subreddit.find({}, (err, data) => {
        if (err) return cb(err);
        cb(null, data);
    })
}

db.getUserPosts = (username, cb) => {
    Posts.find({username: username}).exec((err, data) => {
        if (err) cb(err);
        cb(null, data);
    });
}




module.exports = db;