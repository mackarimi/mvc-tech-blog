const { Comment } = require("../models");

const commentData = [
  {
    user_id: 1,
    post_id: 1,
    comment_text: "This is a comment on the first post.",
  },
  {
    user_id: 2,
    post_id: 2,
    comment_text: "This is a comment on the second post.",
  },
  {
    user_id: 3,
    post_id: 3,
    comment_text: "This is a comment on the third post.",
  },
];


const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
