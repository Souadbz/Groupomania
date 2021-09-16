'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      models.Comment.belongsTo(models.User, {
        foreignKey: {
          name: 'userId',
          allowNull: false
        },
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION',
      });
      models.Comment.belongsTo(models.Post, {
        foreignKey: {
          name: 'postId',
          allowNull: false
        },
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION',
      });
    }
  };
  Comment.init({
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER,
    content: DataTypes.STRING,
    imageUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};