const Comment = require("./Comment");
const Post = require("./Post");
const User = require("./User");


// user with multiple posts
User.hasMany(Post, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});


// user with multiple comments
User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});


// post with multiple comments
Post.hasMany(Comment, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});


// post based on user id
Post.belongsTo(User, {
  foreignKey: "user_id",
});


// comment based on user id
Comment.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});


// comment based on post id
Comment.belongsTo(Post, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});


module.exports = {
  User,
  Post,
  Comment,
};