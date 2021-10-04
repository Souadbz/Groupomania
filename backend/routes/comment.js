/*** importer express pour avoir le router ***/
const express = require('express');
/*** appeler le router avec la méthode express/ il va nous permettre d'utiliser le mot router. à la place de app. ***/
const router = express.Router();

/*** la récupération de  la configuration d'authentification de JsonWebToken ***/
const auth = require('../middleware/auth');
/*** importer le controllers comment pour associer les fonctions aux routes***/
const commentCtrl = require('../controllers/comments');

/*** Requête POST pour créer un nouveau commentaire ***/
router.post('/comments', commentCtrl.createComment);

/*** Requête DELETE pour supprimer un commentaire posté ***/
router.delete('/comments/:id', auth, commentCtrl.deleteComment);

/*** Requête GET pour récupérer les commentaires ***/
router.get('/comments', auth, commentCtrl.getComments);




/*** exporter le router ***/
module.exports = router;