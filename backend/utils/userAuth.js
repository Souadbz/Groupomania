/*** Définir les variables d'environnement pour masquer les informations de connexion à la base de données  ***/
require("dotenv").config();
/*** importer le package jsonwebtoken pour vérifier les tokens ***/
const jwt = require("jsonwebtoken");

const userAuth = (req) => {
    /*** récupération du token dans le header de la requête d'autorisation et la récupération aprés l'espace du deuxieme élément du tableau qui est le token ***/
    const token = req.headers.authorization.split(" ")[1];
    /*** vérification et décodage du token avec la clé de sécurité ***/
    const decodedToken = jwt.verify(token, `${process.env.SECRET_KEY}`);

    /*** vérification du userId envoyé avec la requête qui doit correspondre au userId encodé du token ***/
    const userId = decodedToken.userId;


    return userId;
};

module.exports = userAuth;

/*module.exports = {
    tokenSign: `${process.env.SECRET_KEY}`,
    generateToken: function (user) {
        return jwt.sign({
                userId: user.id,
                isAdmin: user.isAdmin
            },
            this.tokenSign, {
                expiresIn: '24h'
            })
    },
    getUserId: function (data) {
        if (data.length > 1) {
            let token = data.split(' ')[1];
            try {
                let decodedToken = jwt.verify(token, this.tokenSign)
                userId = decodedToken.userId
                return userId
            } catch (err) {
                return err
            }
        };
    }
}*/