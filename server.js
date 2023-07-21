const express = require("express");
const controllers = require("./controllers");
const { engine } = require("express-handlebars");
const connection = require("./config/connection");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

const sessionStore = new SequelizeStore({
  db: connection,
});

// ...

app.engine(
  "handlebars",
  engine({
    defaultLayout: "main",
    partialsDir: path.join(__dirname, "views", "partials"),
    helpers: require("./utils/helpers"), // Use require to import the helpers object
  })
);


app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// ...

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      secure: false,
      maxAge: 987000000,
    },
  })
);

app.use(controllers);

app.listen(PORT, async () => {
  console.log(`Listening on PORT ${PORT}`);
  try {
    await connection.sync({ force: process.env.FORCE_CONNECTION });
    await sessionStore.sync(); // Sync the session store without forcing
    console.log("Session store synced");
  } catch (error) {
    console.error("Unable to sync session store:", error);
  }
});
