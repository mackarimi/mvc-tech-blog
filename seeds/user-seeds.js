const { User } = require("../models");

const userData = [
  {
    username: "user1",
    password: "password1",
    twitter: "user1",
    github: "user1",
    email: "user1@mail.com",
    // Add other user fields as needed
  },
  {
    username: "user2",
    password: "password2",
    twitter: "user2",
    github: "user2",
    email: "user2@mail.com",

    // Add other user fields as needed
  },

  // Add more user data as needed
  {
    username: "user3",
    password: "password3",
    twitter: "user3",
    github: "user3",
    email: "user3@mail.com",
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
