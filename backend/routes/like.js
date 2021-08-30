/*** importer express pour avoir le router ***/
const express = require('express');
/*** appeler le router avec la méthode express/ il va nous permettre d'utiliser le mot router. à la place de app. ***/
const router = express.Router();
/*** la récupération de  la configuration d'authentification de JsonWebToken ***/
const auth = require('../middleware/auth');
/*** importer le controllers like pour associer les fonctions aux routes***/
const likeCtrl = require('../controllers/like');



/*** Requête POST pour créer un nouveau like***/
router.post('/post/:id/like', auth, likeCtrl.createLike);

/*** Requête DELETE pour supprimer un like posté ***/
router.delete('/post/:id/like', auth, likeCtrl.deleteLike);

/*** Requête GET pour récupérer les likes  ***/
router.get('/post/:id/like', auth, likeCtrl.getLikes);

/*** exporter le router ***/
module.exports = router;