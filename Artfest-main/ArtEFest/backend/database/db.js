// db.js
const Sequelize = require('sequelize');

const componenteSequelize = new Sequelize('sitema_login', 'root', 'Rique@_16', // Use o nome do seu DB aqui
{
    dialect: 'mysql',
    host: 'localhost',
    // logging: false
});

module.exports = componenteSequelize;