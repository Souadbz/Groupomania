'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const db = {};
/*** Définir les variables d'environnement pour masquer les informations de connexion à la base de données  ***/
require("dotenv").config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});


sequelize.sync();

db.Post = require('./Post')(sequelize, Sequelize);
db.User = require('./User')(sequelize, Sequelize);
db.Comment = require('./Comment')(sequelize, Sequelize);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Post.belongsTo(db.User, {
  foreignKey: {
    name: 'userId',
    allowNull: false
  },
  onDelete: 'CASCADE',
  onUpdate: 'NO ACTION',
});


db.Comment.belongsTo(db.User, {
  foreignKey: {
    name: 'userId',
    allowNull: false
  },
  onDelete: 'CASCADE',
  onUpdate: 'NO ACTION',
});

db.Comment.belongsTo(db.Post, {
  foreignKey: {
    name: 'postId',
    allowNull: false
  },
  onDelete: 'CASCADE',
  onUpdate: 'NO ACTION',
});

sequelize.authenticate()
  .then(() => console.log('Connexion réussie !'))
  .catch(err => console.log('Connexion échouée:' + error))


module.exports = db;