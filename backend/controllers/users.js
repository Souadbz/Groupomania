/*** importer le package de chiffrement bcrypt ***/
const bcrypt = require('bcrypt');
require("dotenv").config();

const getAuthUserId = require('../utils/getAuthUserId');
/*** modèle  ***/
const db = require('../models')
const User = db.User;
const Post = db.Post;
/** d'importer le package 'file system' de Node pour accéder aux differentes opérations liées aux systèmes de fichiers
 *  ainsi on peut gérer les téléchargements et suppressions d'images ***/
const fs = require('fs');
/*** importer le package jsonwebtoken pour créer des tokens d'authentification et de les vérifier ***/
const jwt = require('jsonwebtoken');
/*** importer le package mot de passe pour exiger aux utilisateurs d'utiliser des mots de passes avec des majuscules, minuscules, chiffres et caractères spéciaux  ***/
const passwordValidator = require('password-validator');

/*** Créer le schéma pour garantir plus de sécurité aux mots de passes des utilisateurs ***/
const schema = new passwordValidator();
schema
    .is().min(6) /*** minimum 6 caractères ***/
    .is().max(15) /*** maximum 15 caractères ***/
    .has().uppercase() /*** mot de passe doit contenir des lettres majuscules ***/
    .has().lowercase() /*** mot de passe doit contenir des lettres miniscules  ***/
    .has().digits(2) /*** mot de passe doit contenir deux chiffres minimun ***/
    .has().not().spaces() /*** mot de passe ne doit pas avoir d'espace ***/
    .is().not().oneOf(['Passw0rd', 'Password123']); /*** Ces valeurs sont dans la liste noire ***/

exports.signup = async (req, res, next) => {
    /*** si le mot de passe du visiteur ne respecte pas le schéma password ***/
    try {
        if (!schema.validate(req.body.password)) {
            return res.status(400).json({
                error: 'Votre mot de passe doit contenir des majuscules, des minisules, deux chiffres minimum et sans espaces',
            });
        }
        /*** appeler bycrpt et hasher le mot de passe, l'algorithme fera 10 tours***/
        bcrypt.hash(req.body.password, 10)
            /*** Création du user ***/
            .then(hash => {

                User.create({
                        id: req.body.id,
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        password: hash,
                        isAdmin: req.body.isAdmin,

                    })

                    .then((user) => res.status(201).json({
                        userId: user.id,
                        isAdmin: user.isAdmin,
                        token: jwt.sign({
                                userId: user.id,
                                isAdmin: user.isAdmin,
                            },
                            `${process.env.SECRET_KEY}`, {
                                expiresIn: '24h'
                            }
                        ),
                        message: 'utilisateur connecté et créé',
                    }))

                    .catch(error => res.status(400).json({
                        error,
                        message: "impossible de créer le compte "
                    }))
            })

            .catch(error => res.status(500).json({
                error,
                message: "erreur serveur pour la création du compte"
            }))

    } catch (error) {
        console.log(error)
    }
}


/***POST/api/auth/login /connecter les utilisateurs existants ***/
exports.login = (req, res, next) => {
    try {
        /**** récupérer le user de la base de données avec findOne ***/
        User.findOne({
                where: {
                    email: req.body.email
                }
            })
            .then((user) => {
                if (!user) {
                    return res.status(404).json({
                        message: 'Utilisateur introuvable'
                    });
                } /*** comparer le mot de passe avec bcrypt ***/
                bcrypt.compare(req.body.password, user.password)
                    .then((valid) => {
                        if (!valid) {
                            return res.status(401).json({
                                message: 'Mot de passe incorrect '
                            });
                        }

                        res.status(200).json({
                            user: {
                                id: user.id,
                                firstName: user.firstName,
                                lastName: user.lastName,
                                email: req.body.email,
                                password: req.body.password,
                                isAdmin: user.isAdmin,
                                imageUrl: user.imageUrl
                            },
                            userId: user.id,
                            isAdmin: user.isAdmin,
                            token: jwt.sign({
                                    userId: user.id,
                                    isAdmin: user.isAdmin,
                                },
                                `${process.env.SECRET_KEY}`, {
                                    expiresIn: '24h'
                                }
                            )

                        });
                    })
                    .catch(error => res.status(500).json({
                        error
                    }));
            })
            .catch(error => res.status(500).json({
                error
            }));
    } catch (error) {
        console.log(error)
    }
};

/*** Modifier le profile ***/
exports.updateProfile = (req, res, next) => {
    const userObject = req.file ? {
        ...req.body.user,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {
        ...req.body
    };
    User.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(user => {
            if (user.id !== getAuthUserId(req)) {
                return res.status(401).json({
                    error
                })
            }
            user.update({
                    ...userObject
                }, {
                    where: {
                        id: req.params.id
                    }
                })
                .then((user) => res.status(200).json({
                    message: "Profil à jour !",
                    user: {
                        id: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        isAdmin: user.isAdmin,
                        imageUrl: user.imageUrl
                    }

                }))
                .catch(error => res.status(405).json({
                    error
                }))
        });
}
/*** suppression du profile ***/
exports.deleteProfile = (req, res, next) => {
    User.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(user => {
            if (user.id !== getAuthUserId(req)) {
                return res.status(401).json({
                    error
                })
            }
            /*** supprimer le user avec la fonction destroy ***/
            user.destroy({
                    where: {
                        id: req.params.id
                    }
                })
                .then(() => res.status(200).json({
                    message: 'Profil a été supprimé avec succés'
                }))
                .catch(error => res.status(409).json({
                    error
                }))
        })
}
/***  Afficher un profile ***/
exports.getProfile = async (req, res, next) => {

    /*** on récupére l'utilisateur depuis la base de données ***/
    try {
        const user = await User.findOne({
                attributes: ['id', 'firstName', 'lastName', 'email', 'isAdmin', 'imageUrl'],
                where: {
                    id: req.params.id
                }
            })

            .then(user => res.status(200).json({
                user
            }))


            /*** problème serveur ***/
            .catch(function (err) {
                res.status(500).json({
                    error,
                    message: 'le serveur ne récupère pas le profile'
                });
            });

    } catch (error) {
        console.log(error)
    }

};

/*** récupèrer les profiles ***/

exports.getAllProfiles = (req, res, next) => {
    User.findAll({
            attributes: ['id', 'firstName', 'lastName', 'email', 'imageUrl', 'isAdmin']
        })
        .then(users => res.status(200).json({
            users
        }))
        .catch(error => res.status(404).json({
            error
        }))

};

exports.adminDeleteProfileUser = (req, res, next) => {
    /*** supprimer le compte d'un user avec destroy ***/
    User.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(() => res.status(200).json({
            message: 'Profil du user supprimé !'
        }))
        .catch(error => res.status(403).json({
            error
        }))
    console.log(User.destroy)
};