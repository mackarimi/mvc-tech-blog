const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

//  create our Post model
class Post extends Model {}

Post.init(
  {
    // Column definitions
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [3] },
    },
    post_content: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: { len: [3] },
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "post",
  }
);

module.exports = Post;
