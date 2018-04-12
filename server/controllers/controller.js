const db = require('../db/index.js');

const getSinglePost = (req, res) => {
    db.getOnePost(req.params.postId, (post) => {
        res.status(201).send(post);
    });
};

const getPosts = (req, res) => {
    db.getMultiplePosts((data) => {
        res.status(200).send(data);
    });
};

const incrementVoteOnPost = (req, res) => { // use req.params
    const {postId, username, type} = req.params;
    db.adjustLike(postId, username, type);
    res.status(200).send();
};


module.exports.getSinglePost = getSinglePost;
module.exports.incrementVoteOnPost = incrementVoteOnPost;
module.exports.getPosts = getPosts;