const getUserId = require("../utils/getUserId");

/*** importer les modèles ***/
const db = require('../models')
const Comment = db.Comment;
fs = require('fs')

/***Création  d'un commentaire ***/
exports.createComment = (req, res, next) => {
        Comment.create({
                userId: req.body.userId,
                postId: req.body.postId,
                content: req.body.content
            })
            .then(() => res.status(201).json({
                message: 'commentaire créé !'
            }))
            .catch(error => res.status(400).json({
                error
            }))
    },
    /*** Suppression d'un commentaire ***/
    exports.deleteComment = (req, res, next) => {
        Comment.findOne({
                where: {
                    id: req.params.id
                }
            })
            .then(comment => {
                if (comment.userId !== getUserId(req)) {
                    return res.status(401).json({
                        error
                    })
                }
                comment.destroy()
                    .then(() => res.status(200).json({
                        message: 'oups ! le commentaire est bien effacé !'
                    }))
                    .catch(error => res.status(409).json({
                        error
                    }))
            });


    }

/*** Affichage  des commentaires ***/
exports.getComments = (req, res, next) => {
    Comment.findAll()
        .then((comments) => res.status(200).json(comments))
        .catch(error => res.status(400).json({
            error: 'impossible de récupérer les commentaires'
        }))
};

exports.adminDeleteComment = (req, res, next) => {
    Comment.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(() => res.status(200).json({
            message: 'commentaire effacé par admin !'
        }))
        .catch(error => res.status(400).json({
            error
        }))
        .catch(error => res.status(403).json({
            message: 'vous n\êtes pas un admins'
        }))
};