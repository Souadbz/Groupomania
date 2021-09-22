const jwt = require('jsonwebtoken'); /*** importer le package jsonwebtoken pour vérifier les tokens ***/

require("dotenv").config();

const getUserIdToken = require("../utils/getUserId");
module.exports = (req, res, next) => {
    const userId = req.body.userId;
    const authorization = req.headers.authorization;

    console.log(req.body.userId)

    try {
        if (!authorization) throw new Error("Problème auth");
        if (userId && userId !== getUserIdToken(req)) throw new Error("userId invalide");
        next();
    } catch (error) {
        res.status(401).json({
            error
        });
    }
};





















//const jwt = require('jsonwebtoken'); /*** importer le package jsonwebtoken pour vérifier les tokens ***/
/*** l'application du middleware à touts les routes pour les sécuriser ***/
/*
module.exports = (req, res, next) => {
    try {
        /*** récupération du token dans le header de la requête d'autorisation et la récupération aprés l'espace du deuxieme élément du tableau qui est le token ***/
//     const token = req.headers.authorization.split(' ')[1];
/*** vérification et décodage du token avec la clé de sécurité ***/
//     const decodedToken = jwt.verify(token, `${process.env.SECRET_KEY}`);
/*** vérification du userId envoyé avec la requête qui doit correspondre au userId encodé du token ***/
/*      const userId = decodedToken.userId;
        if (req.body.userId !== userId) {
            throw 'user ID est invalide ';
        } else {
            next();
        }
    } catch {
        res.status(401).json({
            error: ' token inconnu la requête est invalide  !'
        });
    }
};*/