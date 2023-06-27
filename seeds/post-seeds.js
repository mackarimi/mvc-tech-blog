const { Post } = require("../models");

const postData = [
  {
    title: "Test Post 1",

    post_content: "This is a test post",

    user_id: 1,
  },
  {
    title: "Test Post 1",

    post_content: "This is a test post",

    user_id: 2,
  },
  {
    title: "Test Post 1",

    post_content: "This is a test post",

    user_id: 3,
  },
  {
    title: "Test Post 1",

    post_content: "This is a test post",

    user_id: 4,
  },
  {
    title: "Test Post 1",

    post_content: "This is a test post",

    user_id: 5,
  },
  {
    title: "Test Post 1",

    post_content: "This is a test post",

    user_id: 5,
  },
  {
    title: "Test Post 1",

    post_content: "This is a test post",

    user_id: 6,
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
