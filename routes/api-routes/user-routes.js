const {User} = require("../../models");
const router = require("express").Router();


// add new user to db
router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.status(200).json(userData);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});


// login
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    if (!userData) {
      res
        .status(400)
        .json({ message: "Invalid. Please Try Again" });
      return;
    }
    
    const passwordInput = await userData.checkPassword(req.body.password);
    if (!passwordInput) {
      res
        .status(400)
        .json({ message: "Invalid. Please Try Again" });
      return;
    }
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.logged_in = true;
      res.status(200).json({ user: userData});
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// destroy session when user logs out
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    console.log(err);
    res.status(404).end();
  }
});


module.exports = router;