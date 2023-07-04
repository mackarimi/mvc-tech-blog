const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

// Dashboard route - Get all posts for the logged-in user
router.get("/", withAuth, async (req, res) => {
  console.log(req.session);
  console.log("======================");
  try {
    const dbPostData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      attributes: ["id", "title", "created_at", "post_content"],
      include: [
        {
          model: Comment,
          attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    const posts = dbPostData.map((post) => post.get({ plain: true }));
    res.render("dashboard", { posts, loggedIn: true });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Edit post route - Get the post to be edited
router.get("/edit/:id", withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "title", "created_at", "post_content"],
      include: [
        {
          model: Comment,
          attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    if (!dbPostData) {
      res.status(404).json({ message: "No post found with this id" });
      return;
    }

    const post = dbPostData.get({ plain: true });
    res.render("edit-post", {
      post,
      loggedIn: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Add post route
router.get("/add", withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      attributes: ["id", "title", "created_at", "post_content"],
      include: [
        {
          model: Comment,
          attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    const posts = dbPostData.map((post) => post.get({ plain: true }));
    res.render("add-post", { posts, loggedIn: true });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
