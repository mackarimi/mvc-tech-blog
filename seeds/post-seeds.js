const { Post } = require("../models");

const postData = [
  {
    title: "First Post",
    post_content: "This is the content of the first post.",
    user_id: 1,
  },
  {
    title: "Second Post",
    post_content: "This is the content of the second post.",
    user_id: 2,
  },
  {
    title: "Third Post",
    post_content: "This is the content of the second post.",
    user_id: 3,
  }
  // Add more post data as needed
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
