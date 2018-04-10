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
    id: 1,
    author: 'nick123',
    likes: 27,
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    parent: {},
    children: [2, 3],
    post: 1
  },
  {
    id: 2,
    author: 'joseph123',
    likes: 27,
    text: 'Dummy text Dummy text Dummy text Dummy text Dummy text Dummy text Dummy text.',
    parent: 1,
    children: [],
    post: 1
  },
  {
    id: 3,
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
    id: 12,
    name: 'Cats'
  },
  {
    id: 8,
    name: 'Tech'
  },
  {
    id: 4,
    name: 'Memes'
  },
];

const posts = [
  {
    id: 1,
    name: 'Stray Cat Wanders Into Police Station',
    url: 'https://i.imgur.com/lyEmz0U.jpg',
    likes: 57,
    username: 'nick123',
    subReddit: 'cats'
  },
  {
    id: 2,
    name: 'Mark Zuckerberg while being questioned by the senate',
    url: 'https://i.imgur.com/i44HiFN.jpg',
    likes: 117,
    username: 'joseph123',
    subReddit: 'tech'
  },
  {
    id: 3,
    name: 'This meme isn’t fine as it is Memes',
    url: 'https://www.reddit.com/r/memes/comments/8ba611/this_meme_isnt_fine_as_it_is/',
    likes: 312,
    username: 'david123',
    subReddit: 'memes'
  }
];