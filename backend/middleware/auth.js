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
        } /*** message d'erreur  ***/
    } catch {
        res.status(401).json({
            error: new Error('la requête est invalide !')
        });
    }
};