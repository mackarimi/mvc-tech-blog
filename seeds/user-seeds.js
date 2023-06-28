const { User } = require("../models");

const userData = [
  {
    username: "martin_bour",
    twitter: "martinb",
    github: "martinb",
    email: "martin_b@gmail.com",
    password: "p@ssword1",
  },
  // Add or modify user data as needed
  {
    username: "john_doe",
    twitter: "johnd",
    github: "johnd",
    email: "john_doe@gmail.com",
    password: "p@ssword7",
  },
  {
    username: "jane_smith",
    twitter: "janes",
    github: "janes",
    email: "jane_smith@gmail.com",
    password: "p@ssword8",
  },
  {
    username: "jim_jones",
    twitter: "jimj",
    github: "jimj",
    email: "jim_jones@gmail.com",
    password: "p@ssword9",
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
