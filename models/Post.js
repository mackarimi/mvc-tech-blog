const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

//  create our Post model
class Post extends Model {}

//  create fields/columns for Post model
Post.init(
  //  define id column
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    //  define title column
    title: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },

    //  define post_content column
    post_content: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    //  define user id column
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
