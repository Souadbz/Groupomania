/*** importer mysql ***/
var mysql = require("mysql2");
/*** importer les modèles ***/
//const userAuth = require('../utils/userAuth')
const db = require('../models/index')

const Comment = db.Comment
const User = db.User;
const Post = db.Post
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
        /*  Comment.findOne({
                  where: {
                      id: req.params.id
                  }
              })
              .then(comment => {
                  if (comment.userId !== userAuth(req)) {
                      return res.status(401).json({
                          message: 'Requête non autorisée !'
                      })
                  }
                  comment.destroy()
                      .then(() => res.status(200).json({
                          message: 'commentaire effacé !'
                      }))
                      .catch(error => res.status(400).json({
                          error
                      }))
              });*/
        commentId = req.params.id;

        Comment.destroy({
                where: {
                    id: commentId
                }
            })
            .then(() => {
                Post.findAll({
                        order: [
                            ['createdAt', 'DESC']
                        ],
                        attributes: {
                            exclude: ['updatedAt']
                        },
                        include: [
                            // Impossible d'atteindre la table de jointure ePost
                            // { all: true, nested: true 
                            // }
                            {
                                model: User,
                                attributes: ['firstName', 'lastName', 'imageURL'],
                            },
                            {
                                model: Comment,
                                attributes: ['content', 'userId', 'id'],
                                include: [{
                                    model: User,
                                    attributes: ['firstName', 'lastName', 'imageURL']
                                }]
                            }
                        ]
                    })
                    .then(posts => {

                        res.status(200).send(posts);
                    })
                    .catch(error => {
                        res.status(500).send({
                            error,
                            message: "Impossible jouter la table des likes aux posts"
                        });
                    })

            })
            .catch(error => {
                res.status(500).send({
                    error,
                    message: "Un problème est survenu lors de la suppression du commentaire"
                })
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