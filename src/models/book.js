const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Book = sequelize.define('Book', {
    id:{
        type: DataTypes.CHAR,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    title:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    author:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      published_year: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    stock:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    isbn:{
        type: DataTypes.STRING(13),
        allowNull: false,
        unique: true,
    },
    }, {
      timestamps: true,
      updatedAt: 'updated_at',
      createdAt: 'created_at',
    }
);

module.exports = Book;
