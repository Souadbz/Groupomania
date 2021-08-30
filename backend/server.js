/*** importer le package http natif de node/ nous avons accés à un objet http qui nous permet de créer un serveur ***/
const http = require('http');
/*** https est la variante sécurisée du html qui utilise les protocoles
SSL/TLS(secure sockets layer/ transport layer security) qui permettent de protéger les données entre 
les visiteurs et le sites web en les cryptant. Avec Node.js le https recquis le certificat SSL avec un nom de domaine ***/
/*** importer mon appliation ***/
const app = require('./app');
/*** la fonction normalizePort renvoie un port valide, qu'il soit fourni sous la forme d'un numéro ou d'une chaîne ***/
const normalizePort = val => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};
/*** indiquer le port sur lequel va tourner notre appliction express ***/
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
/*** la fonction errorHandler recherche les différentes erreurs et les gère de manière appropriée.
     Elle est ensuite enregistrée dans le serveur ***/
const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};
/*** création du serveur  ***/
const server = http.createServer(app);
/*** un écouteur d'évènements est également enregistré,
    consignant le port ou le canal nommé sur lequel le serveur s'exécute dans la console ***/
server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
});
/*** le serveur écoute le port ***/
server.listen(port);