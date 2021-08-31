/*** importer mysql ***/
var mysql = require("mysql2");
/*** importer les modèles ***/
const models = require('../models');

/***Création  d'un commentaire ***/
exports.createComment = (req, res, next) => {
    /**** créer le commentaire ***/
    models.Comment.create({
        userId: req.user.id,
        post_id: req.params.id,
        date_post: req.body.date_post,
        content: req.body.content
    })
    /*** si tout est ok ***/
    res.status(201).json({
        message: "commentaire créé !"
    })
    /*** sinon on envoie une erreur ***/
    if (error) {
        res.status(500).json(error)
    }
};

/*** Suppression d'un commentaire ***/
exports.deleteComment = (req, res, next) => {
    /*** récupérer id du commentaire ***/
    const comment = models.Comment.findOne({
        where: {
            id: req.body.id
        }
    })
    /*** si le userId est différent de user.id ***/
    if (!(req.user.id === comment.userId)) {
        return res.status(401).json({
            message: 'userId du commentaire est différent du user.id'
        })
    }
    /*** supprimer le post ***/
    models.Comment.destroy({
        where: {
            userId: req.user.id,
            id: req.body.id
        }
    })
    /*** problème serveur ***/
    if (error) {
        res.status(500).json({
            error: 'le serveur ne répond pas'
        });
    };
    res.status(200).json({
        message: "commentaire supprimé ! "
    })
};
/*** Affichage  des commentaires ***/
exports.getComments = (req, res, next) => {
    /*** on récupère les commentaires ***/
    const comments = models.Comment.findAll({
        where: {
            post_id: req.params.id
        }
    })
    if (!comments) {
        return res.status(200).json({
            message: "pas de commentaires"
        })
    }
    /*** problème serveur si erreur ***/
    if (error) {
        res.status(500).json({
            error: 'le serveur ne répond pas'
        });
    }; /*** sinon ***/
    res.status(200).json(comments);
};