const express = require('express');
const router = express.Router();
const controller = require('../contollers/controller.js');

// handle POST for Vote
router.post('/post/vote', getSinglePost);

// handle GET for Post
router.get('/post', incrementVoteOnPost);

module.exports = router;
