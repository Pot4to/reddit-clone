const Likes = require('./schemas/likes.js').Likes;
const Posts = require('./schemas/posts.js').Posts;
const Subreddits = require('./schemas/subreddit.js').Subreddit;
const Subscriptions = require('./schemas/subscriptions.js').Subscription;
const Users = require('./schemas/user.js').User;

const likes = [
  {
    identification: 24,
    username: 'nick123',
    postId: 1,  
  },
  {
    identification: 42,
    username: 'nick123',
    postId: 2,  
  },
  {
    identification: 11,
    username: 'david123',
    postId: 2,  
  },
];

const posts = [
  {
    identification: 1,
    title: 'Stray Cat Wanders Into Police Station',
    url: 'https://i.imgur.com/lyEmz0U.jpg',
    likes: 57,
    username: 'nick123',
    subReddit: 'cats',
    text: 'filler text',
    parent: null
  },
  {
    identification: 2,
    title: 'Mark Zuckerberg while being questioned by the senate',
    url: 'https://i.imgur.com/i44HiFN.jpg',
    likes: 117,
    username: 'joseph123',
    subReddit: 'tech',
    text: 'filler text',
    parent: null
  },
  {
    identification: 3,
    title: 'This meme isn’t fine as it is Memes',
    url: 'https://www.reddit.com/r/memes/comments/8ba611/this_meme_isnt_fine_as_it_is/',
    likes: 312,
    username: 'david123',
    subReddit: 'memes',
    text: 'filler text',
    parent: null
  },
  {
    identification: 12,
    title: null,
    url: null,
    likes: 27,
    username: 'nick123',
    subReddit: null,
    text: 'comment text',
    parent: 1
  },
  {
    identification: 42,
    title: null,
    url: null,
    likes: 29,
    username: 'joseph123',
    subReddit: null,
    text: 'comment text',
    parent: 1
  },
  {
    identification: 17,
    title: null,
    url: null,
    likes: 40,
    username: 'david123',
    subReddit: null,
    text: 'comment text',
    parent: 3
  }
];

const subReddits = [
  {
    identification: 12,
    name: 'Cats'
  },
  {
    identification: 8,
    name: 'Tech'
  },
  {
    identification: 4,
    name: 'Memes'
  },
];

const subscriptions = [
  {
    identification: 411,
    username: 'david123',
    postId: 2,  
  },
  {
    identification: 4,
    username: 'david123',
    postId: 1,  
  },
  {
    identification: 73,
    username: 'joseph123',
    postId: 3,  
  }
];

const users = [
    {
      username: 'nick123',
      password: 'abcd123' 
    },
    {
      username: 'joseph123',
      password: 'password123'
    },
    {
      username: 'david123',
      password: 'wooo123'   
    }
];


// insert dummy data into db
var insertData = () => {
  users.forEach((user) => {
    var newUser = new Users(user);
    newUser.save((err) => err ? console.log('Error inserting user', err) : console.log('Users inserted'));
  });

  subscriptions.forEach((subscription) => {
    var newSubscription = new Subscriptions(subscription);
    newSubscription.save((err) => err ? console.log('Error inserting subscription', err) : console.log('Subscription inserted'));
  });

  subReddits.forEach((subReddit) => {
    var newSubReddit = new Subreddits(subReddit);
    newSubReddit.save((err) => err ? console.log('Error inserting Subreddit', err) : console.log('Subreddits inserted'));
  });

  posts.forEach((post) => {
    var newPost = new Posts(post);
    newPost.save((err) => err ? console.log('Error inserting post', err) : console.log('Posts inserted'));
  });

  likes.forEach((like) => {
    var newLike = new Likes(like);
    newLike.save((err) => err ? console.log('Error inserting like', err) : console.log('Like inserted'));
  });
};

insertData();