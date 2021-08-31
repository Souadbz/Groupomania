/** d'importer le package 'file system' de Node pour accéder aux differentes opérations liées aux systèmes de fichiers
 *  ainsi on peut gérer les téléchargements et suppressions d'images ***/
const fs = require('fs');
var mysql = require("mysql2");
/*** importer les modèles ***/
const models = require('../models');


/***  Créer un post ***/
exports.createPost = (req, res, next) => {
    /*** l'utilisation de l'objet postObject avec l'operateur ternaire ou conditionnel pour voir si req.file existe ou pas */
    /*** récupérer les informations du post avec l'image  ***/
    const postObject = req.file ? {
        ...JSON.parse(req.body.post),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {
        ...JSON.parse(req.body.post)
    }
    /*** créer le post ***/
    models.Post.create({
        ...postObject,
        userId: req.user.id,
        date_post: req.user.date_post,
        content: req.user.content,
        imageUrl: req.user.imageUrl
    })
    if (error) {
        res.status(500).json(error)
    }
    /*** si pas d'erreur ***/
    res.status(201).json({
        message: 'le post est créé'
    })

};
/*** Modifier un post ***/
exports.updatePost = (req, res, next) => {
    /*** on récupére id  ***/
    const post = models.Post.findOne({
        where: {
            id: req.params.id
        }
    })
    if (req.file) {
        /*** extraire le nom du fichier dans l'objet post***/
        const filename = post.imageUrl.split('/images/')[1]
        /*** appeler unlink pour supprimer le fichier ***/
        fs.unlink(`images/${filename}`, (err) => {
            if (err) throw err;
            console.log('image supprimée')
        })
    }
    /*** l'utilisation de l'objet postObject avec l'operateur ternaire ou conditionnel pour voir si req.file existe ou pas */
    /*** récupérer les informations du user et générer la nouvelle image si l'image existe/modification de l'image ***/
    const postObject = req.file ? {
        ...JSON.parse(req.body.post),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {
        ...JSON.parse(req.body.post) /*** sinon on récupérer le post dans le corps de la requête avec les informations modifiés/sans modifier l'image ***/
    }
    /*** si le userId est différent du id user de la requête ***/
    if (post && post.userId !== req.user.id) {
        return res.status(401).json({
            message: "Aucun post à afficher !"
        });
    }
    /*** si tout est ok, on modifie le post ***/
    post.update({
        ...postObject,
        id: req.params.id
    })
    /*** si problème serveur ***/
    if (error) {
        res.status(500).json({
            error: 'le serveur ne répond pas'
        });
    };
    /*** id de post est le même que l'id du paramètre de la requête ***/

    res.status(200).json({
        message: 'le post a été modifié'
    })

};
/*** Supprimer un post ***/
exports.deletePost = (req, res, next) => {
    /*** on récupére id  ***/
    const post = models.Post.findOne({
        where: {
            id: req.params.id
        }
    })

    if (post.imageUrl) {
        /*** extraire le nom du fichier dans l'objet post***/
        const filename = post.imageUrl.split('/images/')[1]
        /*** appeler unlink pour supprimer le fichier ***/
        fs.unlink(`images/${filename}`, (err) => {
            if (err) throw err;
            console.log('image supprimé')
        })
    } /*** userId différent de user.id ***/
    if (post && post.userId !== req.user.id) {
        return res.Status(401).json({
            message: 'userId différent de user.id'
        });
    }
    /*** supprimer le post ***/
    models.Post.destroy({
        where: {
            id: req.params.id
        }
    })
    /*** supprimer les likes du post ***/
    models.Like.destroy({
        where: {
            post_id: req.params.id
        }
    })
    /*** supprimer les commentaires du post***/
    models.Comment.destroy({
        where: {
            post_id: req.params.id
        }
    })
    /*** problème serveur ***/
    if (error) {
        res.status(500).json({
            error: 'le serveur ne répond pas'
        });
    };
    res.status(200).json({
        message: "post supprimé ! "
    })

};
/* Afficher un seul message */
exports.getOnePost = (req, res, next) => {
    /*** on récupére id du post depuis la base de données ***/
    const post = models.Post.findOne({
        where: {
            id: req.params.id
        }
    })
    /*** si on ne trouve pas id du post  ***/
    if (!post) {
        res.status(400).json({
            message: "post introuvable!"
        })
    }
    /*** problème serveur ***/
    if (error) {
        res.status(500).json({
            error: 'le serveur ne répond pas'
        });
    }
    res.status(200).json(post)
};
/***  Afficher les posts ***/
exports.getAllPosts = (req, res, next) => {
    /*** on récupère tout les posts ***/
    const posts = models.Post.findAll();
    /*** si tout est ok ***/
    res.status(200).json(posts)
    /*** sinon on envoie une erreur ***/
    if (error) {
        res.status(500).json(error)
    }
};