const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller.js');

// handle POST for Vote
router.post('/post/vote/:postId/:username/:postOwner/:type', (req, res) => controller.incrementVoteOnPost(req, res));

// handle GET for single post
router.get('/post/:postId', (req, res) => controller.getSinglePost(req, res));

// handle GET for all Posts for home page
router.get('/home/posts/:criteria', (req, res) => controller.getPosts(req, res));

// handle GET for comments on a given post
router.get('/comments/:postId', (req, res) => controller.getCommentsForPost(req, res));

// handle POST for comments on either posts or other comments
router.post('/comments/:parent/:username/:text', (req, res) => controller.postOnAComment(req, res));

// handle POST for creating a new subreddit
router.post('/subreddits/:name/:description/:url', (req, res) => controller.postSubreddit(req, res));

// handle GET for getting all post under a subreddit
router.get('/subreddit/*', (req, res) => controller.getSubredditPost(req, res));

// handle POST for Create Post
router.post('/create-post/:username/:title/:url/:text/:subreddit/:imageurl', (req, res) => controller.addPost(req, res));

// handle GET for the list of subreddits
router.get('/subs', (req, res) => controller.subs(req, res));

// handle POST for subscribing user
router.post('/subscription/*', (req, res) => controller.subscribe(req, res));

// handle GET for a particular users posts
router.get('/userPosts/:username', (req, res) => controller.getUserPosts(req, res));


module.exports = router;
