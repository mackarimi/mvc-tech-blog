const {Comment, User} = require("../../models/");
const router = require("express").Router();
const withAuth = require("../../utils/auth");


// retrieve all comments
router.get("/", async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      include: [User],
    });
    const comments = commentData.map((comment) => comment.get({ plain: true }));

    console.log(comments);

    res.render("single-post", { comments, layout: "main", logged_in: true });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// post a new comment 
router.post("/", withAuth, async (req, res) => {
  try {
    const addComment = await Comment.create({
      comment_text: req.body.comment_text,
      post_id: req.body.post_id,
      user_id: req.session.user_id,
    });
    res.json(addComment);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;