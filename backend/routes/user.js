/*** importer express pour avoir le router ***/
const express = require('express');
/*** appeler le router avec la méthode express ***/
const router = express.Router();
/*** la récupération de  la configuration d'authentification de JsonWebToken ***/
const auth = require('../middleware/auth');
const authAdmin = require('../utils/authAdmin')
/*** importer multer pour la gestion des images ***/
const multer = require('../middleware/multer-config');
/*** importer le controllers users pour associer les fonctions aux routes ***/
const userCtrl = require('../controllers/users');


/*** les routes d'authentification ***/

/*** créer et enregister un nouvel utilisateur ***/
router.post('/auth/signup', userCtrl.signup);
/*** la connection d'un utilisateur ***/
router.post('/auth/login', userCtrl.login);

/*** récupérer le profile ***/
router.get('/users/:id', auth, multer, userCtrl.getProfile);
/*** récupérer les profiles ***/
router.get('/users', auth, userCtrl.getAllProfiles);
/*** modifier le profile ***/
router.put('/users/:id', auth, multer, userCtrl.updateProfile);

/*** supprimer le profile ***/
router.delete('/users/:id', auth, multer, userCtrl.deleteProfile);

/*** administateur: supprimer le profile d'un utilisateur ***/
router.delete('/admin/delete/:id', authAdmin, multer, userCtrl.adminDeleteProfileUser);

/*** exporter le router ***/
module.exports = router;