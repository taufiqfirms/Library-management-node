const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Book = sequelize.define('Book', {
  id: {
    type: DataTypes.CHAR,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  published_year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  isbn: {
    type: DataTypes.STRING(13),
    allowNull: false,
    unique: true,
  },
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = Book;
