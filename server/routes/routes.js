const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller.js');

// handle POST for Vote
router.post('/post/vote/:postId/:username/:type', (req, res) => controller.incrementVoteOnPost(req, res));

// handle GET for single Post
router.get('/post/:postId', (req, res) => controller.getSinglePost(req, res));

// handle GET for all Posts for home page
router.get('/home/posts', (req, res) => controller.getPosts(req, res));

// handle GET for comments on a given post
router.get('/comments/*', (req, res) => controller.getCommentsForPost(req, res));

//handle POST for comments on either posts or other comments
router.post('/comments/*', (req, res) => controller.postOnAComment(req, res));

//handle POST for creating a new subreddit
router.post('/subreddits', (req, res) => controller.postSubreddit(req, res));

//handles GET for getting all post under a subreddit
router.get('/subreddit/*', (req, res) => controller.getSubredditPost(req, res));

// handle POST for Create Post
router.post('/create-post/:username/:title/:url/:text', (req, res) => console.log(req.params));

//handle GET for the list of subreddits
router.get('/subs', (req, res) => controller.subs(req, res));

module.exports = router;
