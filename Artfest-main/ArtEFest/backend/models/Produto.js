// models/Produto.js
const { DataTypes } = require('sequelize');
const database = require('../database/db'); // <-- VERIFIQUE ESTE CAMINHO

const Produto = database.define('produtos', { // Nome da tabela no DB
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  preco: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  tableName: 'produtos', // Garante que o nome da tabela no DB seja 'produtos'
  timestamps: false // Se você não tiver created_at/updated_at nas tabelas
});

module.exports = Produto;