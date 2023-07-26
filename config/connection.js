const Sequelize = require("sequelize");
require("dotenv").config();

let sequelize;

if (process.env.JAWSDB_URL) {
  // Use JAWSDB_URL for database connection if available (on Heroku)
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  // Use local database configuration for development
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
    dialectOptions: {
      decimalNumbers: true,
    },
  });
}

async function connect() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been made.");
  } catch (error) {
    console.error("Unable to establish a connection to the database:", error);
  }
}

connect();

module.exports = sequelize;
