const {Post, User} = require("../models");
const router = require("express").Router();
// custom middleware
const withAuth = require("../utils/auth");


// retrieve all data for logged in user
router.get("/", withAuth, async (req, res) => {
  console.log(req.session);
  try {
    const postData = await Post.findAll({
      where: { user_id: req.session.user_id },
      include: [User],
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    console.log(posts);
    res.render("home-dashboard", {
      posts,
      layout: "dashboard",
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


// new post screen
router.get("/new", withAuth, (req, res) => {
  res.render("new-post", {
    layout: "dashboard",
  });
});


// retrieve existing post and edit function
router.get("/edit/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);
    if (postData) {
      const post = postData.get({ plain: true });
      console.log(post);
      res.render("edit-post", {
        layout: "dashboard",
        post,
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.redirect("login");
  }
});


module.exports = router;