
const Sequelize = require('sequelize');


const connection = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite', 
    logging: false
});

connection.authenticate()
    .then(() => console.log('✅ Connexion SQLite réussie.'))
    .catch(err => console.error('❌ Erreur connexion :', err));

module.exports = { connection };