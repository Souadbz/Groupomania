  /*** importer le package de chiffrement bcrypt ***/
  const bcrypt = require('bcrypt');
  require("dotenv").config();
  var mysql = require("mysql2");
  /*** importer le package jsonwebtoken pour créer des tokens d'authentification et de les vérifier ***/
  const jwt = require('jsonwebtoken');
  /*** importer les modèles ***/
  const models = require('../models');

  /** d'importer le package 'file system' de Node pour accéder aux differentes opérations liées aux systèmes de fichiers
   *  ainsi on peut gérer les téléchargements et suppressions d'images ***/
  const fs = require('fs');
  const passwordValidator = require('password-validator'); /*** importer le package mot de passe pour exiger aux utilisateurs d'utiliser des mots de passes avec des majuscules, minuscules, chiffres et caractères spéciaux  ***/
  //var CryptoJS = require("crypto-js"); /*** crypto-js permet de crypter les emails ***/

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

  /*** POST /api/auth/signup /enregistrer les nouveaux utilisateurs ***/
  exports.signup = (req, res, next) => {

      /*** si le mot de passe du visiteur ne respecte pas le schéma password ***/
      if (!schema.validate(req.body.password)) {
          return res.status(400).json({
              'error': 'Votre mot de passe doit contenir des majuscules, des minisules, deux chiffres minimum et sans espaces'
          });
      }

      /*** Vérifier que l'émail n'existe pas dans la base de données ***/
      const emailExist = models.User.findOne({
          where: {
              email: req.body.email
          }
      })
      if (emailExist) {
          return res.status(401).json({
              error: "email existant !"
          })
      }
      /*** appeler bycrpt et hasher le mot de passe, l'algorithme fera 10 tours***/
      const hashPassword = bcrypt.hash(req.body.password, 10);
      /*** création un nouveau utilisateur/inscription ***/
      models.User.create({
              // imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              email: req.body.email,
              password: hashPassword,
              isAdmin: 0

          })
          .then(() => res.status(201).json({
              message: 'utilisateur créé'
          }))
          .catch(error => res.status(500).json({
              error: "erreur serveur"
          }));

  };
  /***POST/api/auth/login /connecter les utilisateurs existants ***/
  exports.login = (req, res, next) => {
      /*** Vérifier que l'émail existe dans la base de donnée ***/
      const user = models.User.findOne({
          where: {
              email: req.body.email
          }
      })
      /*** si l'émail n'existe pas dans la base de donnée ***/
      if (!user) {
          return res.status(404).json({
              error: "email inexistant"
          })
      }
      /*** comparer le mot de passe de la requête avec celui de la base de données avec l'utilisation de bcrypt ***/
      const comparisonPassword = bcrypt.compare(req.body.password, user.password)
      if (!comparisonPassword) {
          return res.status(401).json({
              error: "Mot de passe incorrecte !"
          })
      }
      /*** création du token pour sécuriser le compte de l'utilisateur ***/
      /*** la fonction sign de jsonwebtoken est pour encoder un nouveau token ***/
      const token = jwt.sign({
          id: user.id /*** ce token contient l'id de l'utilisateur en tant que payload (les données qu'on souhaite encodées dans le token) ***/
      }, `${process.env.SECRET_KEY}`, {
          expiresIn: '24h'
      }) /***  la durée de validité du token est 24 heures ***/
      res.status(200).send({
              userId: user.id,
              token
          })
          /*** si mot de passe incorrect ou user inexistant ***/
          .catch(error => res.status(500).json({
              error: "erreur serveur"
          }));
  };
  /*** Modifier le profile ***/
  exports.updateProfile = (req, res, next) => {
      /*** si la req.file existe ***/
      if (req.file) {
          /*** on récupére l'utilisateur depuis la base de données ***/
          const user = models.User.findOne({
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
          const user = models.User.findOne({
              where: {
                  id: req.user.id
              }
          })
          userObject.password = user.hashPassword
      }
      /*** mise à jour du profile ***/
      models.User.update({
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

      /*** on récupére l'utilisateur depuis la base de données ***/
      const user = models.User.findOne({
          where: {
              id: req.user.id
          }
      })
      /*** extraire le nom du fichier dans l'objet user***/
      const filename = user.imageUrl.split('/images/')[1];
      /*** appeler unlink pour supprimer le fichier et le user ***/
      fs.unlink(`images/${filename}`, () => {
          user.destroy()
      })
      /*** récupérer les posts  ***/
      const posts = models.Post.findAll({
          where: {
              userId: req.user.id
          }
      })
      /*** supprimer les posts ***/
      posts.forEach(post => {
          const postFilename = post.imageUrl.split('/images/')[1]
          fs.unlink(`images/${postFilename}`, () => {
              post.destroy()
          })
      })
      /*** supprimer les likes ***/
      models.Like.destroy({
          where: {
              userId: req.user.id
          }
      })
      /**** supprimer les commentaires ***/
      models.Comment.destroy({
          where: {
              userId: req.user.id
          }
      })
      then(() => res.status(200).json({
          /*** reponse ok ***/
          message: ' profile supprimé avec succès !'
      }));
      /*** problème serveur ***/
      if (error) {
          res.status(500).json({
              error: 'le serveur ne répond pas'
          });
      };
  };
  /***  Afficher un profile ***/
  exports.getProfile = (req, res, next) => {

      /*** on récupére l'utilisateur depuis la base de données ***/
      const user = models.User.findOne({
              where: {
                  id: req.user.id
              }
          })
          .then(() => res.status(200).json({
              user
          }))
          /*** problème serveur ***/
          .catch(function (err) {
              res.status(500).json({
                  error: 'le serveur ne répond pas'
              });
          });

  };