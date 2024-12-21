const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Member = sequelize.define('Member', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: 'Please provide a valid email address',
      },
    },
  },
  phone: {
    type: DataTypes.STRING(15),
    allowNull: false,
    validate: {
      is: {
        args: /^[0-9]{10,15}$/, // Adjust phone number format validation as needed
        msg: 'Phone number must be valid',
      },
    },
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = Member;
