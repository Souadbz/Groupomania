/*** importer express pour avoir le router ***/
const express = require('express');
/*** appeler le router avec la méthode express ***/
const router = express.Router();
/*** la récupération de  la configuration d'authentification de JsonWebToken ***/
const auth = require('../middleware/auth');
/*** importer multer pour la gestion des images ***/
const multer = require('../middleware/multer-config');
/*** importer le controllers user pour associer les fonctions aux routes ***/
const userCtrl = require('../controllers/user');


/*** les routes d'authentification ***/

/*** créer et enregister un nouvel utilisateur ***/
router.post('/auth/signup', multer, userCtrl.signup);
/*** la connection d'un utilisateur ***/
router.post('/auth/login', userCtrl.login);
/*** récupérer le profile ***/
router.get('/users/:id', auth, multer, userCtrl.getProfile);
/*** modifier le profile ***/
router.put('/users/:id', auth, multer, userCtrl.updateProfile);
/*** supprimer le profile ***/
router.delete('/users/:id', auth, multer, userCtrl.deleteProfile);


/*** exporter le router ***/
module.exports = router;