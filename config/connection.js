// Import the Sequelize constructor from the library
const Sequelize = require("sequelize");

require("dotenv").config();

// Create connection to our database, pass in your MySQL information for username and password
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
      host: process.env.DB_HOST || "localhost",
      port: process.env.DB_PORT || 3306,
      dialect: "mysql",
      dialectOptions: {
        decimalNumbers: true,
      },
    });

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
