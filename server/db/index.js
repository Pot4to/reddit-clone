const mongoose = require('mongoose');
const mongoUri = 'mongodb://localhost/reddit';
const User = require('./schemas/user.js')
const Subreddit = require('./schemas/subreddit.js')
const Comment = require('./schemas/comment.js')
const Post = require('./schemas/post.js')

const db = mongoose.connect(mongoUri);
