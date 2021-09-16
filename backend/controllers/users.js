/*** importer le package de chiffrement bcrypt ***/
const bcrypt = require('bcrypt');
require("dotenv").config();
let userAuth = require("../utils/userAuth");
//const adminAuth = require("../utils/adminAuth")
/*** modèle  ***/
const db = require('../models/index')
const User = db.User
//let utils = require('../utils/jwtUtils')
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

exports.signup = (req, res, next) => {
    /*** si le mot de passe du visiteur ne respecte pas le schéma password ***/
    try {
        if (!schema.validate(req.body.password)) {
            return res.status(400).json({
                error: 'Votre mot de passe doit contenir des majuscules, des minisules, deux chiffres minimum et sans espaces',
            });
        }
        /*** appeler bycrpt et hasher le mot de passe, l'algorithme fera 10 tours***/
        /*** Vérifier que l'émail n'existe pas dans la base de données ***/
        const emailExist = User.findOne({
            where: {
                email: req.body.email
            }
        })
        if (emailExist) {
            return res.status(401).json({
                error: "email existant !"
            })
        }

        bcrypt.hash(req.body.password, 10)
            /*** Création de l'user ***/
            .then(hash => {

                User.create({
                        id: req.body.id,
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        password: hash,
                        isAdmin: false
                    })

                    .then(() => res.status(201).json({
                        message: 'utilisateur connecté et créé',
                    }))
                    .catch(error => res.status(400).json({
                        error: "impossible de créer le compte "
                    }))
            })

            .catch(error => res.status(500).json({
                error: "erreur serveur pour la création du compte"
            }))
    } catch (error) {
        console.log(error)
    }
}


/***POST/api/auth/login /connecter les utilisateurs existants ***/
exports.login = (req, res, next) => {
    try {
        User.findOne({
                where: {
                    email: req.body.email
                }
            })
            .then((user) => {
                if (!user) {
                    return res.status(401).json({
                        message: 'Utilisateur introuvable'
                    });
                }
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
                        error: 'erreur de se connecter'
                    }));
            })
            .catch(error => res.status(500).json({
                error: 'erreur serveur pour se connecter'
            }));
    } catch (error) {
        console.log(error)
    }
};

/*** Modifier le profile ***/
exports.updateProfile = (req, res, next) => {
    /*** si la req.file existe ***/
    if (req.file) {
        /*** on récupére l'utilisateur depuis la base de données ***/
        const user = User.findOne({
            where: {
                id: req.user.id
            }
        })
        /*** extraire le nom du fichier dans l'objet user***/
        const filename = user.imageUrl.split('/images/')[1]
        /*** appeler unlink pour supprimer le fichier ***/
        fs.unlink(`images/${filename}`, (err) => {
            if (error) throw error;
        })
    }
    /*** l'utilisation de l'objet userObject avec l'operateur ternaire ou conditionnel pour voir si req.file existe ou pas */
    /*** récupérer les informations du user et générer la nouvelle image si l'image existe/modification de l'image ***/
    const userObject = req.file ? {
        ...JSON.parse(req.body.user),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {
        ...JSON.parse(req.body.user) /*** sinon on récupérer le user dans le corps de la requête avec les informations modifiés/sans modifier l'image ***/
    }

    if (userObject.password != '') {
        userObject.password = bcrypt.hash(userObject.password, 10);
    } else {
        const user = User.findOne({
            where: {
                id: req.user.id
            }
        })
        userObject.password = user.hashPassword
    }
    /*** mise à jour du profile ***/
    User.update({
        ...userObject
    }, {
        where: {
            id: req.user.id
        }
    })
    if (userObject.imageUrl) {
        models.Post.update({
            imageUrl: userObject.imageUrl
        }, {
            where: {
                userId: req.user.id
            }
        })
    }
    if (error) {
        res.status(500).json({
            error: 'le serveur ne répond pas'
        })
    }
    res.status(200).json({
        message: 'Profile modifié !'
    });

}
/*** suppression du profile ***/
exports.deleteProfile = (req, res, next) => {
    User.findOne({
        where: {
            id: req.params.id
        }
    })

    User.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(() => res.status(200).json({
            message: 'Profil a été supprimé avec succés'
        }))
        .catch(error => res.status(401).json({
            message: 'impossible de supprimer ce profil'
        }))

}
/***  Afficher un profile ***/
exports.getProfile = (req, res, next) => {

    /*** on récupére l'utilisateur depuis la base de données ***/
    try {
        User.findOne({
                attributes: ['id', 'firstName', 'lastName', 'email', 'isAdmin'],
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
                    error: 'le serveur ne récupère pas le profile'
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

exports.adminDeleteProfile = (req, res, next) => {

    /*   User.destroy({
               where: {
                   id: req.params.id
               }
           })
           .then(() => res.status(200).json({
               message: 'Profil supprimé !'
           }))
           .catch(error => res.status(403).json({
               message: 'Requête réservée aux admins'
           }))*/
    const userIdToDestroy = req.params.id;
    const adminId = req.params.adminId;

    User.findByPk(adminId)
        .then((user) => {
            if (user.isAdmin) {
                User.destroy({
                        where: {
                            id: userIdToDestroy
                        }
                    })
                    .then(() => {
                        User.findAll({
                                order: [
                                    ['lastName', 'ASC']
                                ],
                                attributes: ['firstName', 'lastName', 'isAdmin', 'id']
                            })
                            .then(data => {
                                res.status(200).send(data);
                            })
                            .catch(error => {
                                res.status(500).send({
                                    error,
                                    message: "Unable to reach users list"
                                });
                            });
                    })
                    .catch(error => {
                        res.status(500).send({
                            error,
                            message: "Unable to delete account"
                        });
                    })
            } else {
                res.status(401).send({
                    message: "You are not allowed to delete other users' accounts "
                });
            }
        })
        .catch(error => {
            res.status(401).send({
                error,
                message: "Can't find admin user is database"
            });
        })
};

exports.adminUpdateProfile = (req, res, next) => {
    const userObject = req.file ? {
        ...req.body.user,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {
        ...req.body
    };
    User.update({
            ...userObject
        }, {
            where: {
                id: req.params.id
            }
        })
        .then(() => res.status(200).json({
            message: "Profil modifié !"
        }))
        .catch(error => res.status(403).json({
            message: 'Modification réservée aux admins !'
        }))
};

exports.newAdmin = (req, res, next) => {
    User.findOne({
            where: {
                id: req.body.userId
            }
        })
        .then((user) => {
            if (user.isAdmin === true) {
                User.update({
                        isAdmin: true
                    }, {
                        where: {
                            id: req.params.id
                        }
                    })
                    .then(() => res.status(200).json({
                        message: 'utilisateur promu admin !'
                    }))
                    .catch(error => res.status(400).json({
                        error
                    }))
            }
        })
        .catch(error => res.status(403).json({
            message: 'Requête réservée aux admins'
        }))
};