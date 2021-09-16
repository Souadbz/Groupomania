/** d'importer le package 'file system' de Node pour accéder aux differentes opérations liées aux systèmes de fichiers
 *  ainsi on peut gérer les téléchargements et suppressions d'images ***/
const fs = require('fs');
const auth = require('../middleware/auth');
//const adminAuth = require('../utils/adminAuth');
var mysql = require("mysql2");
/*** importer les modèles ***/
const db = require('../models/index');

const User = db.User;
const Comment = db.Comment;

const userAuth = require('../utils/userAuth');

const Post = db.Post



/***  Créer un post ***/
exports.createPost = (req, res, next) => {
    if (!req.body.content) {
        return res.status(400).json({
            message: "Merci d'écrire un post !"
        });

    }
    Post.create({
            userId: userAuth(req),
            content: req.body.content,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        })
        .then(() => res.status(201).json({
            message: 'post publié !'
        }))
        .catch((error) => res.status(400).json({
            error
        }))


    /*
 
     if (req.file) {
         const post = {
             userId: req.body.id,
             content: req.body.content,
             imageURL: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
         };
 
         db.Post.create(post)
             .then(() => res.status(201).json({
                 message: 'post créé !'
             }))
             .catch((error) => res.status(400).json({
                 error: 'problème de création'
             }))
     } else {
         const post2 = {
             userId: req.body.id,
             content: req.body.content,
             imageURL: null
         };
         db.Post.create(post2)
             .then(() => res.status(201).json({
                 message: 'post crée sans photo !'
             }))
             .catch((error) => res.status(400).json({
                 error: 'problème de création de post sans photo'
             }))
     }*/
}
/*** Modifier un post ***/
exports.updatePost = (req, res, next) => {
    Post.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(post => {
            if (post.userId !== userAuth(req)) {
                return res.status(401).json({
                    message: 'authentification échouée !'
                })
            };
            const postObject = req.file ? {
                ...req.body.post,
                imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            } : {
                ...req.body
            };
            Post.update({
                    ...postObject
                }, {
                    where: {
                        id: req.params.id /*** id de post est le même que l'id du paramètre de la requête ***/
                    }
                })
                .then(() => res.status(200).json({
                    message: 'le post a été modifié'
                }))
                .catch(error => res.status(400).json({
                    error
                }))
        });
};
/*** Supprimer un post ***/
exports.deletePost = (req, res, next) => {
    Post.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(post => {
            if (post.userId !== req.body.id) {
                return res.status(401).json({
                    message: 'authentication échouée !'
                })
            };
            const filename = post.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                post.destroy({
                        where: {
                            id: req.params.id
                        }
                    })
                    .then(() => res.status(200).json({
                        message: 'le post est supprimé !'
                    }))
                    .catch(error => res.status(400).json({
                        error
                    }))
            })
        });

};
/* Afficher un seul message */
exports.getOnePost = (req, res, next) => {
    /*** on récupére id du post depuis la base de données ***/
    Post.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(post => res.status(200).json({
            post
        }))
        .catch(error => res.status(404).json({
            error
        }))
};
/***  Afficher les posts ***/
exports.getAllPosts = (req, res, next) => {
    /*** on récupère tout les posts ***/
    Post.findAll()
        /*** si tout est ok ***/
        .then(posts => res.status(200).json({
            posts
        }))
        /*** sinon on envoie une erreur ***/
        .catch(error => res.status(400).json({
            error
        }))

};
exports.adminDeletePost = (req, res, next) => {
    Post.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(post => {
            const filename = post.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                post.destroy({
                        where: {
                            id: req.params.id
                        }
                    })
                    .then(() => res.status(200).json({
                        message: 'Gif supprimé !'
                    }))
                    .catch(error => res.status(403).json({
                        message: 'requête réservée aux admins'
                    }))
            })
        });
};