const db = require('../db/index.js');

const getSinglePost = (req, res) => {
    db.getOnePost(req.params.postId, (post) => {
        res.status(201).send(post);
    });
};

const incrementVoteOnPost = (req, res) => {
    var [postId, username, type] = req.body;
    db.adjustLike(postId, username, type);
    res.status(200).send();
};


module.exports.getSinglePost = getSinglePost;
module.exports.incrementVoteOnPost = incrementVoteOnPost;