const { Sequelize } = require('sequelize');

// MySQL database configuration
const sequelize = new Sequelize('library_db', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,  // Turn off SQL query logging (optional)
});

const connectDb = async () => {
  try {
    await sequelize.authenticate(); // Authenticate the connection
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

module.exports = { sequelize, connectDb };
