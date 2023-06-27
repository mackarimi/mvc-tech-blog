const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// FET ALL USERS

router.get("/", (req, res) => {
  User.findAll({
    attributes: { exclude: ["password"] },
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => res.status(500).json(err));
});

// GET SINGLE USER

router.get("/:id", (req, res) => {
  user
    .findOne({
      attributes: { exclude: ["password"] },
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Post,
          attributes: ["id", "title", "created_at", "post_content"],
        },
        {
          model: Comment,
          attributes: ["id", "comment_text", "created_at"],
          include: {
            model: Post,
            attributes: ["title"],
          },
        },
      ],
    })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(400).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// CREATE USER

router.post("/", (req, res) => {
  User.create({
    username: req.body.username,
    twitter: req.body.twitter,
    email: req.body.email,
    github: req.body.github,
    password: req.body.password,
  }).then((dbUserData) => {
    req.session.save(() => {
      (req.session.user_id = dbUserData.id),
        (req.session.username = dbUserData.username),
        (req.session.twitter = dbUserData.twitter),
        (req.session.email = dbUserData.email),
        (req.session.github = dbUserData.github),
        (req.session.loggedIn = true);

      res.json(dbUserData);
    });
  });
});

// LOGIN

router.post("/login", (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((dbUserData) => {
    if (!dbUserData) {
      res.status(400).json({ message: "No user with that email address!" });
      return;
    }
    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password!" });
      return;
    }
    req.session.save(() => {
      (req.session.user_id = dbUserData.id),
        (req.session.username = dbUserData.username),
        (req.session.twitter = dbUserData.twitter),
        (req.session.email = dbUserData.email),
        (req.session.github = dbUserData.github),
        (req.session.loggedIn = true);

      res.json({ user: dbUserData, message: "You are now logged in!" });
    });
  });
});

router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(200).end();
    });
  } else {
    res.status(404).end();
  }
});

// UPDATE USER

router.put("/:id", withAuth, (req, res) => {
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(400).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => res.status(500).json(err));
});

// DELETE USER

router.delete("/:id", withAuth, (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(400).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
