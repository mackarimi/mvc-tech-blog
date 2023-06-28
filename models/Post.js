const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

//  create our Post model
class Post extends Model {}

//  create fields/columns for Post model
Post.init(

  //  define post_id column
  {
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    //  define title column
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    //  define post_content column
    post_content: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    //  define user_id column
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
