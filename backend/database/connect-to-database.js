/*** Définir les variables d'environnement pour masquer les informations de connexion à la base de données  ***/
require("dotenv").config();

const Sequelize = require('sequelize');
const db = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});
db.authenticate()
    .then(() => console.log('Connexion réussie !'))
    .catch(err => console.log('Connexion échouée:' + error))