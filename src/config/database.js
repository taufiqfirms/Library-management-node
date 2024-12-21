const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000
        },
    }
);

sequelize.authenticate()
.then(() => console.log('Database connection success'))
.catch(e => console.error('Database connection failed:', e));

module.exports = sequelize;