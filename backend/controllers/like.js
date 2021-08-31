/*** importer mysql ***/
var mysql = require("mysql2");
/*** importer les modèles ***/
const models = require('../models');
/***  Création  d'un like ***/
exports.createLike = (req, res, next) => {
    /**** créer le j'aime ***/
    models.Like.create({
        userId: req.user.id,
        post_id: req.params.id,
        liked: req.body.liked
    })
    /*** si tout est ok ***/
    res.status(201).json({
        message: "like créé !"
    })
    /*** sinon on envoie une erreur ***/
    if (error) {
        res.status(500).json(error)
    }
};

/*** Suppression d'un like ***/
exports.deleteLike = (req, res, next) => {
    /*** supprimer le like ***/
    models.Like.destroy({
        where: {
            userId: req.user.id,
            post_id: req.params.id
        }
    })
    /*** si tout est ok ***/
    res.status(200).json({
        message: "like créé !"
    })
    /*** sinon on envoie une erreur ***/
    if (error) {
        res.status(500).json(error)
    }
};
/*** Affichage des likes ***/
exports.getLikes = (req, res, next) => {

    const like = models.Like.findOne({
        where: {
            post_id: req.params.id,
            userId: req.user.id
        }
    })
    if (!like) {
        return res.status(200).json({
            message: 'liked !'
        })
    }
    /*** si tout est ok ***/
    res.status(200).json(like)
    /*** sinon on envoie une erreur ***/
    if (error) {
        res.status(500).json(error)
    }
}