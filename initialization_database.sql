/*** création de la base de données ***/
DROP DATABASE IF EXISTS groupomania;
CREATE DATABASE groupomania CHARACTER SET 'utf8';
USE groupomania;

/*** création de la table utilisateurs ***/

DROP TABLE IF EXISTS Users;
CREATE TABLE Users (
    id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    imageUrl VARCHAR(255) NULL,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL, 
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    isAdmin TINYINT NOT NULL DEFAULT 0,
    createdAt datetime NULL,
    updatedAt datetime NULL,
    PRIMARY KEY (id)  
) ENGINE = InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*** servent PRIMARY KEY(id) est une clé primaire qui serve à identifier une ligne de manière unique ***/

/*** création de la table des articles,
 on ajoute une clé étrangère pour associer chaque post à son utilisateur
 (On donne un nom à notre clé,on indique la colonne sur laquelle on crée la clé,puis la Colonne de référence) ***/

DROP TABLE IF EXISTS Posts;
CREATE TABLE Posts (
    id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    userId SMALLINT UNSIGNED NOT NULL,
    content TEXT NOT NULL,
    imageUrl VARCHAR(255) NULL,
    createdAt datetime NULL,
    updatedAt datetime NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_post_userId FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

/**** création de la table des commentaires ***/
DROP TABLE IF EXISTS Comments;
CREATE TABLE Comments (
    id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    userId SMALLINT UNSIGNED NOT NULL, 
    postId SMALLINT UNSIGNED NOT NULL,
    content TEXT NOT NULL,
    imageUrl varchar(255) NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_comment_post_id FOREIGN KEY (postId) REFERENCES Posts(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_comment_user_id FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

/*** inserer des users ***/
INSERT INTO Users(id, imageUrl, firstName, lastName, email, password, isAdmin, createdAt, updatedAt) VALUES 
    (4, '', 'dodo', 'Dadi','dodo@gmail.fr', 'DADIdodo12.', 0,'2013-01-04 17:24:19', '2013-01-05 00:24:19'),
  
INSERT INTO Posts(id, userId, content, imageUrl, createdAt, updatedAt) VALUES 
    (2, 4, 'hello tout le monde','', '2015-01-04 17:24:19', '2015-01-05 00:24:19'),
  
INSERT INTO Comments(id, userId, postId, content) VALUES 
(2, 4, 2, 'top !!')