const Sequelize = require('sequelize');

// Use process.env.JAWSDB_URL to connect to the database on Heroku
const sequelize = new Sequelize(process.env.JAWSDB_URL, {
  dialect: 'mysql',
  // Other options if needed
});

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
