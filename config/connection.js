const Sequelize = require('sequelize');

// Read the configuration from config/config.json
const config = require('./config.json')[process.env.NODE_ENV || 'development'];

// Create a new Sequelize instance
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect
  }
);

module.exports = sequelize;
