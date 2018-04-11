const mongoose = require('mongoose');
const mongoUri = 'mongodb://localhost/reddit';

//Schemas
const User = require('./schemas/user.js');
const Subreddit = require('./schemas/subreddit.js');
const Posts = require('./schemas/posts.js');
const Subscriptions = require('./schemas/subscriptions.js');
const Likes = require('./schemas/likes.js');

const db = mongoose.connect(mongoUri);
