const { User } = require("../models");

const userData = [
  {
    username: "user1",
    password: "password1",

    // Add other user fields as needed
  },
  {
    username: "user2",
    password: "password2",
  

    // Add other user fields as needed
  },

  // Add more user data as needed
  {
    username: "user3",
    password: "password3",

  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
