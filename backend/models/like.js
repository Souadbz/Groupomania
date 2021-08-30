'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Like.belongsTo(models.User, {
        foreignKey: 'userId'
      });
      models.Like.belongsTo(models.Post, {
        foreignKey: 'post_id'
      });
    }
  };
  Like.init({
    userId: DataTypes.INTEGER,
    post_id: DataTypes.INTEGER,
    like: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};