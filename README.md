### P7 Créez un réseau social d'entreprise

## Scénario

Je suis développeuse depuis plus d'un an chez CONNECT-E, une petite agence web regroupant une douzaine d'employés.
Votre directrice, Stéphanie, invite toute l'agence à prendre un verre pour célébrer une bonne nouvelle! Elle vient de signer un contrat pour un nouveau projet ambitieux !
Le client en question est `Groupomania`, un groupe spécialisé dans la grande distribution et l'un des plus fidèles clients de l'agence.
Ma mission consiste à construire un réseau social interne pour les employés de `Groupomania` (développer les parties frontend et backend).

## Dossier Central

Créez un dossier nommé `GROUPOMANIA`. A l'intérieur de ce dossier créez un dossier nommé `Backend`

## Dossier Backend

- Serveur **Node.js**
- Framework **Express.js**
- Base de données **MySQL**
- ORM **Sequelize**
- **Api RESET**
- sécurité **RGPD et OWASP**

### Installation

- Accédez sur https://nodejs.org/en/ pour télécharger puis installer `Node.js` sur votre machine
- cd **Backend**:
  - Chargez le package `nodemon` : `npm install -g nodemon`
  - Pour installer `Express.js`, exécutez la commande : `npm install --save express`
  - pour le téléchargement de fichiers, installez le package `Multer` : `npm install --save multer`
  - Lancez les commandes: `npm i fs`, `npm install body-parser`

**Configuration de la base de données :**

Toujours dans le terminal du dossier `backend`

- Installez `mysql2`: `npm install mysql2`
- Pour installer `Sequelize` et `Sequelize CLI`, exécutez les commandes: `npm install sequelize`, `npm install --save sequelize-cli` puis ` npx sequelize init`. Cela créera les dossiers `config`, `models` et `migrations`.
  Le dossier `config` contient le fichier de configuration, qui indique à sequelize comment se connecter à la base de données. Vous devez remplir ce fichier comme suit:

  "username": "Nom de L'utilisateur de la base de données MySQL",

  "password": "mot de passe de l'utilisateur de la base de données MySQL",

  "database": "nom de la base de données MySQL",

  "host": "lien de la base de données MySQL",

  "dialect": "mysql"

-Une fois que vous avez correctement configuré le fichier de configuration, créez les modèles `User`, `Post` et `Comment` comme suit :

`npx sequelize model:generate --name User --attributes "firstName:string,lastName:string,email:string,password:string,imageUrl:string,isAdmin:boolean"` ,

`npx sequelize model:generate --name Post --attributes "userId:integer,imageUrl:string,content:string"`,

`npx sequelize model:generate --name Comment --attributes "userId:integer,postId:integer,imageUrl:string,content:string"`

- Jusqu'à cette étape, nous n'avons rien inséré dans la base de données. Maintenant, pour créer réellement une base de données et ses tables, vous devez :

  - Ouvrir un autre terminal, connectez-vous à votre serveur MySQL(si vous n'avez pas encore installé MySQL sur votre machine je vous conseille de visiter ce lien https://openclassrooms.com/fr/courses/1959476-administrez-vos-bases-de-donnees-avec-mysql/1959969-installez-mysql)
  - Pour créer une base de données dans MySQL, vous avez **deux possibilités** :

    - Première possibilité: importez le fichier `initialization_database.sql` en procédant comme suit:
      `SOURCE (chemin vers le fichier initialization_database.sql);`

    - Deuxième possibilité: exécutez la commande : `DROP DATABASE IF EXISTS groupomania;` `CREATE DATABASE groupomania CHARACTER SET 'utf8'; `

      Puis revenez au terminal du dossier `Backend` pour créer les tables avec la commande: `npx sequelidb:migrate`(cette commande permet de Créer au niveau de la base de données des tables appelées Users Posts et Comments avec toutes les colonnes comme spécifié dans les fichiers de migration.);

      Et enfin retournez vers le terminal MySQL et procédez comme suit:

      `CREATE UNIQUE INDEX index-name-emaON Users (email);`

      `ALTER TABLE Users ADD PRIMARY KEY (id);`

      `ALTER TABLE Posts ADD PRIMARY KEY (id);`

      `ALTER TABLE Comments ADD PRIMARY KEY (id);`

      `ALTER TABLE Posts ADD CONSTRAINT fk_post_userId FOREIGN K(userId) REFERENCES Users(id) ON DELETE CASCADE ON UPDATE CASCADE;`

      `ALTER TABLE Comments ADD CONSTRAIfk_comment_post_id FOREIGN KEY (postId) REFERENCES Posts(id) ON DELETE CASCADE ON UPDATE CASCADE;`

      `ALTER TABLE Comments ADD CONSTRAINT fk_comment_user_id FOREIGN KEY (userId) REFERENCES Users(id) ON DELECASCADE ON UPDATE CASCADE;`

**Indication:**

Avant d'accéder à l'application, vous devrez installer `dotenv`: `npm install dotenv` et créer un fichier d'environnement nommé `.env` dans le répertoire racine du dossier backend. Dans le fichier `.env`, ajoutez vos variables d'environnement comme ci-dessous :

DB_USERNAME='Nom de L'utilisateur de la base de données MySQL'

DB_PASSWORD='mot de passe de l'utilisateur de la base de données MySQL'

DB_HOST='lien de la base de données MySQL'

DB_Name='nom de la base de données MySQL'

SECRET_KEY='clé secrète du token qui doit être difficile à pirater'

**Pour la sécurité de l'application**, installez:

`npm install --save bcrypt`,

`npm install --save jsonwebtoken`,

`npm install --save express-rate-limit`,

`npm install password-validator `,

`npm install helmet --save `

- lancez le serveur: `nodemon server`
- Exécution de l’api sur http://localhost:3000

## Frontend

- Framework **Vue.js** avec l'utilisation de **Vue CLI**
- **Axios**
- **Bootstrap**
- **WCAG**

### Installation

- Ouvrez un terminal dans le dossier central `GROUPOMANIA`:
  - Installez **Vue CLI** : `npm install -g @vue/cli` (Pour plus d'information je vous conseille de lire la documentation vue-cli https://cli.vuejs.org/guide/ )
  - Puis créez le projet `vue create frontend`
  - Puis cd frontend :
    - Exécuter la commande `npm install` pour installer tous les modules nécessaires au fonctionnement de l'application.
    - Installez **Axios** : `npm install axios`
    - Installez **Bootstrap** : `npm install vue bootstrap bootstrap-vue`
    - Lancez la commande `npm run serve`
- Le serveur est accessible en local via le port 8080: http://localhost:8080/
