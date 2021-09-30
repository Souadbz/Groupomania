/*** importer express pour avoir le router ***/
const express = require("express");
/*** appeler le router avec la méthode express/ il va nous permettre d'utiliser le mot router. à la place de app. ***/
const router = express.Router();
/*** la récupération de  la configuration d'authentification de JsonWebToken ***/
const auth = require("../middleware/auth");
const authAdmin = require('../utils/authAdmin')

/*** importer le controllers post pour associer les fonctions aux routes***/
const postCtrl = require("../controllers/posts");
/*** importer multer pour la gestion des images ***/
const multer = require('../middleware/multer-config');


/*** Requête POST pour poster un nouveau post***/
router.post("/posts", auth, multer, postCtrl.createPost);

/*** Requête PUT pour modifier un posté ***/
router.put("/posts/:id", auth, multer, postCtrl.updatePost);

/*** Requête DELETE pour supprimer un post ***/
router.delete("/posts/:id", auth, multer, postCtrl.deletePost);

/*** Requête GET pour afficher tous les posts ***/
router.get("/posts", auth, multer, postCtrl.getAllPosts);

/*** Requête GET pour afficher un post en particulier ***/
router.get("/posts/:id", auth, postCtrl.getOnePost);


/*** Requête DELETE de l'administrateur pour supprimer un post  ***/
router.put("/posts/admin/:id", authAdmin, multer, postCtrl.updatePost);
router.delete('/admin/delete/posts/:id', authAdmin, multer, postCtrl.adminDeletePost);

/*** exporter le router ***/
module.exports = router;