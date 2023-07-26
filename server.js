// boiler plate server.js plus additional dependencies
const express = require("express");
const sequelize = require("./config/connection");
const path = require("path");
const session = require("express-session");
const sessionSequelize = require("connect-session-sequelize")(session.Store);
const exphbs = require("express-handlebars");
const helpers = require("./utils/helpers");
const routes = require("./routes");

const app = express();

const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });


// session setup
const sessionSetup = {
  secret: "AqW56rYx#78!sDf",
  cookie: 
  {
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new sessionSequelize({db: sequelize,}),
};


// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(sessionSetup));
app.use(express.static(path.join(__dirname, "public")));
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");


// decare routes for every request
app.use(routes);


sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`The app is listenening on ${PORT} http://localhost:${PORT}`));
});