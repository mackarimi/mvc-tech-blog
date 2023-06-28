// Import the required modules and models
const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

// Dashboard route - Get all posts for the logged-in user
router.get("/", withAuth, async (req, res) => {
  console.log(req.session);
  console.log("======================");
  Post.findAll({
    // Find all posts associated with the logged-in user
    where: {
      user_id: req.session.user_id,
    },
    // Include the post's associated user and comments
    attributes: ["id", "title", "created_at", "post_content"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username", "email", "twitter", "github"],
        },
      },
      {
        model: User,
        attributes: ["username", "email", "twitter", "github"],
      },
    ],
  })
    // Return the dashboard page with the posts
    .then((dbPostData) => {
      // Serialize the data
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      // Render the dashboard page
      res.render("dashboard", { posts, loggedIn: true });
    })
    // If there was a server error, return the error
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Edit post route - Get the post to be edited
router.get("/edit/:id", withAuth, (req, res) => {
  // Find the post to be edited
  Post.findOne({
    where: {
      id: req.params.id,
    },
    // Include the post's associated user and comments
    attributes: ["id", "title", "created_at", "post_content"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username", "email", "twitter", "github"],
        },
      },
      {
        model: User,
        attributes: ["username", "email", "twitter", "github"],
      },
    ],
  })
    // Return the edit-post page with the post
    .then((dbPostData) => {
      // If no post was found, return an error
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      // Serialize the data
      const post = dbPostData.get({ plain: true });

      // Render the edit-post page
      res.render("edit-post", {
        post,
        loggedIn: true,
      });
    })

    // If there was a server error, return the error
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// add post
router.get("/add", withAuth, (req, res) =>
  Post.findAll({
    where: {
      // use the ID from the session
      user_id: req.session.user_id,
    },
    // include the comment, using the Comment model
    attributes: ["id", "title", "created_at", "post_content"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username", "email", "twitter", "github"],
        },
      },
      {
        model: User,
        attributes: ["username", "email", "twitter", "github"],
      },
    ],
  })
    .then((dbPostData) => {
      // serialize the data
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      // pass the data to the template
      res.render("add-post", { posts, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    })
);

// Export the router
module.exports = router;
