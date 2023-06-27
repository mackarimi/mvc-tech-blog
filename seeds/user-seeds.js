const { User } = require('../models');

const userData = [
  {
    username: "testuser1",
    password: "password1",
    email: "email@kmail.com",
    twitter: "twitter1",
    github: "github1",
  },
  {
    username: "testuser2",
    password: "password2",
    email: "email@email.com",
    twitter: "twitter2",
    github: "github2",
  },
  // Add more user data objects as needed
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
