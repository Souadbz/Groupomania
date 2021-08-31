/*** création de la base de données ***/
DROP DATABASE IF EXISTS groupomania;
CREATE DATABASE groupomania CHARACTER SET 'utf8';
USE groupomania;
/*** création de la table utilisateurs ***/
DROP TABLE IF EXISTS Users;
CREATE TABLE Users (
    id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    /*imageUrl VARCHAR(255) NOT NULL,*/
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL, 
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    isAdmin TINYINT NOT NULL DEFAULT 0,
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
    date_post datetime NOT NULL,
    /*title_post VARCHAR(100) NOT NULL,*/
    content TEXT NOT NULL,
    imageUrl VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_post_users_id FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

/*** création de la table des likes ***/
DROP TABLE IF EXISTS Likes;
CREATE TABLE Likes (
    id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    userId SMALLINT UNSIGNED NOT NULL,
    post_id SMALLINT UNSIGNED NOT NULL,
    liked TINYINT UNSIGNED DEFAULT 0,
    PRIMARY KEY (id),
    CONSTRAINT fk_likes_posts_id FOREIGN KEY (post_id) REFERENCES Posts(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_likes_users_id FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;



/**** création de la table des commentaires ***/
DROP TABLE IF EXISTS Comments;
CREATE TABLE Comments (
    id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    userId SMALLINT UNSIGNED NOT NULL, 
    post_id SMALLINT UNSIGNED NOT NULL,
    date_post datetime NOT NULL,
    content TEXT NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_comment_posts_id FOREIGN KEY (post_id) REFERENCES Posts(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_comment_users_id FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

