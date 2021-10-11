/*** Définir les variables d'environnement pour masquer les informations de connexion à la base de données  ***/
require("dotenv").config();
/*** importer le package jsonwebtoken pour vérifier les tokens ***/
const jwt = require("jsonwebtoken");

const getAuthUserId = (req) => {

    /*** récupération du token dans le header de la requête d'autorisation et la récupération aprés l'espace du deuxieme élément du tableau qui est le token ***/
    const token = req.headers.authorization.split(" ")[1];
    /*** vérification et décodage du token avec la clé de sécurité ***/
    const decodedToken = jwt.verify(token, `${process.env.SECRET_KEY}`);
    /*** décodage du userId ***/
    const userId = decodedToken.userId;

    return userId;
};

module.exports = getAuthUserId;