/*** importer express pour avoir le router ***/
const express = require('express');
/*** appeler le router avec la méthode express ***/
const router = express.Router();
/*** la récupération de  la configuration d'authentification de JsonWebToken ***/
const auth = require('../middleware/auth');
//const adminAuth = require('../utils/adminAuth')
/*** importer multer pour la gestion des images ***/
const multer = require('../middleware/multer-config');
/*** importer le controllers users pour associer les fonctions aux routes ***/
const userCtrl = require('../controllers/users');


/*** les routes d'authentification ***/

/*** créer et enregister un nouvel utilisateur ***/
router.post('/auth/signup', multer, userCtrl.signup);
/*** la connection d'un utilisateur ***/
router.post('/auth/login', userCtrl.login);

/*** récupérer le profile ***/
router.get('/users/:id', auth, multer, userCtrl.getProfile);
/*** récupérer les profiles sans auth ***/
router.get('/users', auth, userCtrl.getAllProfiles); //supprimer id de plus
/*** modifier le profile ***/
router.put('/users/:id', auth, multer, userCtrl.updateProfile);

/*** supprimer le profile  sans auth***/
router.delete('/users/:id', auth, multer, userCtrl.deleteProfile);


/*** news sans auth*/
router.delete('/admin/delete/:id', auth, multer, userCtrl.adminDeleteProfile);
//router.put('/admin/:id', adminAuth, multer, userCtrl.adminUpdateProfile);
//router.put('/new/admin/:id', userCtrl.newAdmin);








/*** exporter le router ***/
module.exports = router;