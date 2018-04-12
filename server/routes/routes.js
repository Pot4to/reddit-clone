const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller.js');

// handle POST for Post
router.post('/post/vote', (req, res) => controller.incrementVoteOnPost(req, res));

// handle GET for Vote
router.get('/post', (req, res) => controller.getSinglePost(req, res));

module.exports = router;
