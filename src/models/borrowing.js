const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Borrowing = sequelize.define('Borrowing', {
  id: {
    type: DataTypes.CHAR,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  book_id: {
    type: DataTypes.CHAR,
    allowNull: false,
    references: {
      model: 'Books',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  member_id: {
    type: DataTypes.CHAR,
    allowNull: false,
    references: {
      model: 'Members',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  borrow_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW, 
  },
  return_date: {
    type: DataTypes.DATEONLY,
    allowNull: true, 
  },
  status: {
    type: DataTypes.ENUM,
    values: ['BORROWED', 'RETURNED'],
    defaultValue: 'BORROWED',
  },
}, {
  tableName: 'borrowings',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});


Borrowing.belongsTo(require('./book'), { foreignKey: 'book_id' });
Borrowing.belongsTo(require('./member'), { foreignKey: 'member_id' });

module.exports = Borrowing;
