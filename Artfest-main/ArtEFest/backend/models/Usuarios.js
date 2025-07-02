// models/Usuarios.js
const { DataTypes } = require('sequelize'); // Importe DataTypes
const database = require('../database/db');

const Usuarios = database.define('usuarios', // Nome da tabela no DB
    {
        id: // Mude de 'Id' para 'id' para consistência com o padrão do SQL
        {
            type: DataTypes.INTEGER, // Use DataTypes
            autoIncrement : true,
            allowNull : false,
            primaryKey : true
        },
        email : // Mude de 'Email' para 'email'
        {
            type: DataTypes.STRING(255), // Use DataTypes e pode definir o length
            allowNull : false,
            unique: true
        },
        senha : // Mude de 'Senha' para 'senha'
        {
            type: DataTypes.STRING(255),
            allowNull: false
        }
    },
    {
        tableName: 'usuarios', // Garante que o nome da tabela no DB seja 'usuarios'
        timestamps: false // Se você não tiver created_at/updated_at
    }
);

module.exports = Usuarios;