/*** importer express pour avoir le router ***/
const express = require("express");
/*** appeler le router avec la méthode express/ il va nous permettre d'utiliser le mot router. à la place de app. ***/
const router = express.Router();
/*** la récupération de  la configuration d'authentification de JsonWebToken ***/
const auth = require("../middleware/auth");
/*** importer le controllers post pour associer les fonctions aux routes***/
const postCtrl = require("../controllers/post");
/*** importer multer pour la gestion des images ***/
const multer = require('../middleware/multer-config');


/*** Requête POST pour poster un nouveau post***/
router.post("/posts", auth, multer, postCtrl.createPost);

/*** Requête PUT pour modifier un posté ***/
router.put("/posts/:id", auth, multer, postCtrl.updatePost);

/*** Requête DELETE pour supprimer un post ***/
router.delete("/posts/:id", auth, multer, postCtrl.deletePost);

/*** Requête GET pour afficher tous les posts ***/
router.get("/posts", auth, postCtrl.getAllPosts);

/*** Requête GET pour afficher un post en particulier ***/
router.get("/posts/:id", auth, postCtrl.getOnePost);

/*** exporter le router ***/
module.exports = router;