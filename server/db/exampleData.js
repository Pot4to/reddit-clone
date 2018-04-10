const Comment = require('./schemas/comment.js').Comment;
const Post = require('./schemas/post.js').Post;
const Subreddit = require('./schemas/subreddit.js').Subreddit;
const User = require('./schemas/user.js').User;

const users = [
    {
      username: 'nick123',
      password: 'abcd123',
      subscriptions: [4, 8, 12],
      posts: [1, 2],
      comments: [1]     
    },
    {
      username: 'joseph123',
      password: 'password123',
      subscriptions: [8],
      posts: [3],
      comments: [2]     
    },
    {
      username: 'david123',
      password: 'wooo123',
      subscriptions: [],
      posts: [],
      comments: [3]     
    },
];

const comments = [
  {
    identification: 1,
    author: 'nick123',
    likes: 27,
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    parent: null,
    children: [2, 3],
    post: 1
  },
  {
    identification: 2,
    author: 'joseph123',
    likes: 27,
    text: 'Dummy text Dummy text Dummy text Dummy text Dummy text Dummy text Dummy text.',
    parent: 1,
    children: [],
    post: 1
  },
  {
    identification: 3,
    author: 'david123',
    likes: 27,
    text: 'More Lorem Ipsum More Lorem Ipsum More Lorem Ipsum More Lorem Ipsum More Lorem Ipsum.',
    parent: 1,
    children: [],
    post: 1
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

const posts = [
  {
    identification: 1,
    name: 'Stray Cat Wanders Into Police Station',
    url: 'https://i.imgur.com/lyEmz0U.jpg',
    likes: 57,
    username: 'nick123',
    subReddit: 'cats'
  },
  {
    identification: 2,
    name: 'Mark Zuckerberg while being questioned by the senate',
    url: 'https://i.imgur.com/i44HiFN.jpg',
    likes: 117,
    username: 'joseph123',
    subReddit: 'tech'
  },
  {
    identification: 3,
    name: 'This meme isn’t fine as it is Memes',
    url: 'https://www.reddit.com/r/memes/comments/8ba611/this_meme_isnt_fine_as_it_is/',
    likes: 312,
    username: 'david123',
    subReddit: 'memes'
  }
];

// insert dummy data into db
var insertData = () => {
  users.forEach((user) => {
    var newUser = new User(user);
    newUser.save((err) => err ? console.log('Error inserting user', err) : console.log('Users inserted'));
  });

  comments.forEach((comment) => {
    var newComment = new Comment(comment);
    newComment.save((err) => err ? console.log('Error inserting comment', err) : console.log('Comments inserted'));
  });

  subReddits.forEach((subReddit) => {
    var newSubReddit = new Subreddit(subReddit);
    newSubReddit.save((err) => err ? console.log('Error inserting Subreddit', err) : console.log('Subreddits inserted'));
  });

  posts.forEach((post) => {
    var newPost = new Post(post);
    newPost.save((err) => err ? console.log('Error inserting post', err) : console.log('Posts inserted'));
  });
};

insertData();