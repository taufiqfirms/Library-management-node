const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Member = sequelize.define('Member', {
  id:{
    type: DataTypes.CHAR,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  email:{
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  phone:{
    type: DataTypes.STRING(15),
    allowNull: false,
  },
  address:{
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  timestamps: true,
  updatedAt: 'updated_at',
  createdAt: 'created_at',
});

module.exports = Member;
