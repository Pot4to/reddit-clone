const express = require('express');
const router = express.Router();

// handle POST for Vote
router.post('/post/vote', (req, res) => res.status(201).send('Server received POST'));

// handle GET for Post
router.get('/post', (req, res) => res.status(200).send('Server received GET'));

module.exports = router;
