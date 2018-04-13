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

const getCommentsForPost = (req, res) => {
    db.recursiveGetComments(req.url.slice(10), (err, data) => {
        if (err) return res.status(404).send();
        res.status(200).send(data);
    })
};

const postOnAComment = (req, res) => {
    console.log(req.body.text, req.body.username, req.body.parent);
    db.postOnAComment(req.body.parent, req.body.username, req.body.text, (err) => {
        if (err) return console.log(err);
        res.status(200).send();
    })
};


module.exports.getSinglePost = getSinglePost;
module.exports.incrementVoteOnPost = incrementVoteOnPost;
module.exports.getPosts = getPosts;
module.exports.getCommentsForPost = getCommentsForPost; 
module.exports.postOnAComment = postOnAComment;