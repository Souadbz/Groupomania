const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, `${process.env.SECRET_KEY}`);
        const isAdmin = decodedToken.isAdmin;
        if (isAdmin !== true) {
            throw 'impossible de se connecter';
        } else {
            next();
        }
    } catch {
        res.status(403).json({
            error: "Admin non authentifié"
        });
    }
};