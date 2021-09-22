/*'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

/*const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});
module.exports = db;
*/
'use strict';
/*** Définir les variables d'environnement pour masquer les informations de connexion à la base de données  ***/
require("dotenv").config();

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;


db.Post = require('./Post')(sequelize, Sequelize);
db.User = require('./User')(sequelize, Sequelize);
db.Comment = require('./Comment')(sequelize, Sequelize);





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