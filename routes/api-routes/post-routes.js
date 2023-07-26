const {Post} = require("../../models");
const router = require("express").Router();
const withAuth = require("../../utils/auth");


// post a new post
router.post("/", withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});


// update post
router.put("/:id", withAuth, async (req, res) => {
  try {
    const [postData] = await Post.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id
      },
    });
    console.log("POSTDATA=", postData);
    if (postData > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


// delete a post
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!postData) {
      res.status(404).json({ message: "Invalid. No post found" });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;