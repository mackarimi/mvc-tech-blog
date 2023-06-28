const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Comment extends Model {}

Comment.init(
  {
    // Comment ID
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    // Post ID
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        // This references the `Post` model, which we set in `Post.js` as its `modelName` property
        model: "post",
        key: "id",
      },
    },

    // User ID
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        // This references the `User` model, which we set in `User.js` as its `modelName` property
        model: "user",
        key: "id",
      },
    },

    // Comment text
    comment_text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // Comment must be at least 1 character long
        len: [1],
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "comment",
  }
);

module.exports = Comment;
