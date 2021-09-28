/** d'importer le package 'file system' de Node pour accéder aux differentes opérations liées aux systèmes de fichiers
 *  ainsi on peut gérer les téléchargements et suppressions d'images ***/
const fs = require('fs');
/*** importer les modèles ***/
let db = require('../models');
const Post = db.Post
const User = db.User;
const getUserId = require("../utils/getUserId");
/***  Créer un post ***/
exports.createPost = (req, res, next) => {
    Post.create({
            userId: getUserId(req),
            content: req.body.content,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        })
        .then(() => res.status(201).json({
            message: 'post créé !'
        }))
        .catch((error) => res.status(400).json({
            error,
            message: 'Vous ne pouvez pas publier un post'
        }))

}
/*** Modifier un post ***/
exports.updatePost = (req, res, next) => {
    Post.findOne({

            where: {
                id: req.params.id
            }
        })
        .then(post => {
            if (post.userId !== getUserId(req)) {
                return res.status(401).json({
                    error
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
                        id: req.params.id
                    }
                })
                .then(() => res.status(200).json({
                    message: 'publication à jour !'
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
            if (post.userId !== getUserId(req)) {
                return res.status(404).json({
                    message: 'post introuvable'
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
                        message: 'le post est bien supprimé !'
                    }))
                    .catch(error => res.status(400).json({
                        error
                    }))
            })
        })
        .catch(error => res.status(500).json({
            error,
            message: 'impossible de supprimer le post !'
        }))
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
            error,
            message: 'impossible de récupèrer un post'
        }))
};
/***  Afficher les posts ***/
exports.getAllPosts = (req, res, next) => {
    /*** on récupère tout les posts ***/
    Post.findAll({
            include: [{
                model: User,
                attributes: ['firstName', 'lastName']
            }],
            order: [
                ['createdAt', 'DESC']
            ]
        })
        /*** si tout est ok ***/
        .then(posts => res.status(200).json({
            posts
        }))
        /*** sinon on envoie une erreur ***/
        .catch(error => res.status(400).json({
            error
        }))

};
/*exports.adminDeletePost = (req, res, next) => {
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
};*/