### P7 Créez un réseau social d'entreprise

## Scénario

Je suis développeuse depuis plus d'un an chez CONNECT-E, une petite agence web regroupant une douzaine d'employés.
Votre directrice, Stéphanie, invite toute l'agence à prendre un verre pour célébrer une bonne nouvelle ! Elle vient de signer un contrat pour un nouveau projet ambitieux ! 
Le client en question est `Groupomania`, un groupe spécialisé dans la grande distribution et l'un des plus fidèles clients de l'agence.
Ma mission consiste à construire un réseau social interne pour les employés de `Groupomania` (développer les parties frontend et backend).

## Backend

- Serveur **Node.js**
- Framework **Express.js**
- Base de données **MySQL**
- ORM **Sequelize**
- **Api RESET**
- sécurité **RGPD et OSWAP**

## Installation
- Exécuter la commande `npm install` pour installer tous les modules nécessaires au fonctionnement de l'application.
- chargez le package `nodemon` : `npm install -g nodemon`
- Configure `config/config.json`
- Run `sequelize db:create && sequelize db:migrate`
- lancez le serveur: `nodemon server`
- Exécution de l’api sur http://localhost:3000

## Indication
Avant d'accéder à l'application, vous devrez créer un fichier d'environnement nommé `.env` dans le répertoire racine du dossier backend.
Dans le fichier `.env`, ajoutez vos variables d'environnement comme ci-dessous :

**1- informations base de données (app)**

DB_USERNAME='Nom de L'utilisateur de la base de données MySQL'

DB_PASSWORD='mot de passe de l'utilisateur de la base de données MySQL'

DB_HOST='lien de la base de données MySQL'

DB_Name='nom de la base de données MySQL'

**2- authentification/ Clé de sécurité TOKEN**

SECRET_KEY='clé secrète du token qui doit être difficile à pirater'

## Frontend

- Framework **Vue.js**
- **Axios**
- **Bootstrap**
- **WCAG**

### Installation
- Exécuter la commande `npm install` pour installer tous les modules nécessaires au fonctionnement de l'application.
- Lancez la commande `np run serve`
- Le serveur est accessible en local via le port 8080: http://localhost:8080/



