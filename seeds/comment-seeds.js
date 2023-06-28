const { Comment } = require('../models');

const commentData = [
    {
        user_id: 1,
        post_id: 5,
        comment_text: "This is awesome!"
    },
    {
        user_id: 4,
        post_id: 4,
        comment_text: "Great work!"
    },
    {
        user_id: 1,
        post_id: 4,
        comment_text: "I love it!",
    },
    {
        user_id: 3,
        post_id: 5,
        comment_text:  "Fantastic job!"
    },
    {
        user_id: 3,
        post_id: 2,
        comment_text: "Impressive!"
    },
    {
        user_id: 3,
        post_id: 4,
        comment_text: "Well done!"
    },
    {
        user_id: 5,
        post_id: 3,
        comment_text:  "Incredible!"
    },
    {
        user_id: 2,
        post_id: 1,
        comment_text: "Bravo!"
    }
]

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;