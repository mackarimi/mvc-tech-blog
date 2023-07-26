const { Post, User, Comment } = require('../models');
const router = require("express").Router();
// custom middleware
const withAuth = require("../utils/auth");


// retrieve data from db
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [User],
    });
    const posts = postData.map((post) => post.get({ plain: true }));
// send serialized data to front-end template
    res.render("homepage", {
      posts,
      layouts: "main",
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


// retrieve single post with wildcard
router.get("/post/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: { id: req.params.id },
      include: [User, {model: Comment, include: User}],
    });
    if (postData) {
      const post = postData.get({ plain: true });
      console.log(post);
      res.render("single-post", { post, logged_in: req.session.logged_in });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


// validating user's login status
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }
  res.render("login");
});


router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }
  res.render("signup");
});


module.exports = router;