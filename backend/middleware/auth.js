const jwt = require('jsonwebtoken'); /*** importer le package jsonwebtoken pour vérifier les tokens ***/


/*** l'application du middleware à touts les routes pour les sécuriser ***/
module.exports = (req, res, next) => {
    try {
        /*** récupération du token dans le header de la requête d'autorisation et la récupération aprés l'espace du deuxieme élément du tableau qui est le token ***/
        const token = req.headers.authorization.split(' ')[1];
        /*** vérification et décodage du token avec la clé de sécurité ***/
        const decodedToken = jwt.verify(token, `${process.env.SECRET_KEY}`);
        /*** vérification du userId envoyé avec la requête qui doit correspondre au userId encodé du token ***/
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'user ID est invalide ';
        } else {
            next();
        }
    } catch {
        res.status(401).json({
            error: new Error('la requête est invalide !')
        });
    }
};















// Exportation de la fonction d'authentification
/*module.exports = (req, res, next) => {
    // Récupération du token dans les paramètres
    const authHeader = req.headers.authorization;

    // Si l'utilisateur possède une autorisation,
    // on déclare le token et on le vérifie, s'il n'y a pas
    // d'erreur, on le next, sinon on renvoie un statut 403
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, `${process.env.SECRET_KEY}`, (err, user) => {
            if (err) {
                return res.status(403);
            }
            next();
        });
    }
    // Sinon, on renvoie le statut 401 Unauthorized
    else {
        res.status(401).json({
            error: "token inconnu la requête est invalide"
        });
    }
};*/















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