const db = require('../db/index.js');

const getSinglePost = (req, res) => {
    db.getOnePost(req.params.postId, (post) => {
        res.status(200).send(post);
    });
};

const getPosts = (req, res) => {
    db.getMultiplePosts((data) => {
        res.status(200).send(data);
    });
};

const incrementVoteOnPost = (req, res) => {
    const {postId, username, type} = req.params;
    db.adjustLike(postId, username, type);
    res.status(201).send();
};

const getCommentsForPost = (req, res) => {
    db.recursiveGetComments(req.url.slice(10), (err, data) => {
        if (err) return res.status(404).send();
        res.status(200).send(data);
    })
};

const postOnAComment = (req, res) => {
    db.postOnAComment(req.body.parent, req.body.username, req.body.text, (err) => {
        if (err) return res.status(404).send();
        res.status(200).send();
    })
};

const postSubreddit = (req, res) => {
    db.postSubreddit(req.body.name, req.body.description, (err) => {
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
    db.getSubreddits((err, data) => {
        if (err) return res.status(400).send();
        res.status(200).send(data);
    })
}
  
const addPost = (req, res) => {
    const {username, title, url, text} = req.params;
    db.savePost({
        username: username,
        title: title,
        url: url,
        text: text,
        parent: null
    });
};

const addPost = (req, res) => {
    const {username, title, url, text} = req.params;
    db.savePost({
        username: username,
        title: title,
        url: url,
        text: text,
        parent: null
    });
};



module.exports.getSinglePost = getSinglePost;
module.exports.incrementVoteOnPost = incrementVoteOnPost;
module.exports.getPosts = getPosts;
module.exports.getCommentsForPost = getCommentsForPost; 
module.exports.postOnAComment = postOnAComment;
module.exports.postSubreddit = postSubreddit;
module.exports.getSubredditPost = getSubredditPost;
module.exports.subs = subs;
module.exports.addPost = addPost;
