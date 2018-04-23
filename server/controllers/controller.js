const db = require('../db/index.js');

const getSinglePost = (req, res) => {
    db.getOnePost(req.params.postId, (post) => {
        res.status(200).send(post);
    });
};

const getPosts = (req, res) => {
    db.getMultiplePosts((data) => {
        const {criteria} = req.params;
        if (criteria === 'likes') {
            data = data.sort((a, b) => b.likes - a.likes);
        } else if (criteria === 'time') {
            data = data.sort((a, b) => {
                return new Date(a.createdAt).getMilliseconds() + new Date(b.createdAt).getMilliseconds();
            });
        }
        res.status(200).send(data);
    });
};

const incrementVoteOnPost = (req, res) => {
    const {postId, username, postOwner, type} = req.params;
    db.adjustLike(postId, username, postOwner, type);
    res.status(201).send();
};

const getCommentsForPost = (req, res) => {
    const {postId} = req.params;
    db.recursiveGetComments(postId, (err, data) => {
        if (err) return res.status(404).send();
        res.status(200).send(data);
    })
};

const postOnAComment = (req, res) => {
    const {parent, username, text} = req.params;
    db.postOnAComment(parent, username, text, (err) => {
        if (err) return res.status(404).send();
        res.status(200).send();
    })
};

const postSubreddit = (req, res) => {
    db.postSubreddit(req.body.name, req.body.description, req.body.image, (err) => {
        if (err) return res.status(404).send();
        res.status(200).send();
    })
}


const getSubredditPost = (req, res) => {
    console.log('req body inside controller: ', req.query.id);
    db.getSubredditPosts(req.query.id, function(error, data) {
      if (error) {
        res.statusCode = 404;
        res.send('Error locating subreddit posts');
      } else {
        res.statusCode = 200;
        res.send(data);
      }
    });
}

const subs = (req, res) => {
    console.log('getting subs');
    db.getSubreddits((err, data) => {
        if (err) return res.status(400).send();
        res.status(200).send(data);
    })
}

const addPost = (req, res) => {
    console.log('adding post')
    const {username, title, url, text, subreddit} = req.params;
    db.savePost({
        username: username,
        title: title,
        url: url,
        text: text,
        parent: null,
        subReddit: subreddit
    }, (err) => {
        if (err) return res.status(404).send();
        res.status(200).send();
    });
};

const subscribe = (req, res) => {
    console.log('req body inside subscribe controller: ', req.body.subRedditId, req.body.userId);
    db.subscribeUser(req.body.subRedditId, req.body.userId, function(error) {
      if (error) {
        res.statusCode = 404;
        res.send('Error subscribing');
      } else {
        res.statusCode = 201;
        res.send('Successfully Subscribed!');
      }
    });
}

const getUserPosts = (req, res) => {
    const {username} = req.params;
    db.getUserPosts(username, (err, data) => {
        if (err) return res.status(404).send();
        res.status(200).send(data);
    });

}


module.exports.getSinglePost = getSinglePost;
module.exports.incrementVoteOnPost = incrementVoteOnPost;
module.exports.getPosts = getPosts;
module.exports.getCommentsForPost = getCommentsForPost; 
module.exports.postOnAComment = postOnAComment;
module.exports.postSubreddit = postSubreddit;
module.exports.getSubredditPost = getSubredditPost;
module.exports.subs = subs;
module.exports.addPost = addPost;
module.exports.subscribe = subscribe;
module.exports.getUserPosts = getUserPosts;