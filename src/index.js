const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });
const path = require("node:path");
const express = require("express");
const app = express();
const passport = require("passport");
const expressSession = require("express-session");
const PostgresConnection = require("connect-pg-simple")(expressSession);
const { pool } = require("./models/pool");
const homeRouter = require("./routers/homeRouters");
const loginRouter = require("./routers/loginRouter");
const signupRouter = require("./routers/signupRouter");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
const sessionStore = new PostgresConnection({
  pool: pool,
});
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000, secure: false },
  })
);
require("./config/passportConf");
app.use(passport.session());

const PORT = process.env.DEV_PORT || 3000;
app.use((req, res, next) => {
  res.locals.loggedIn = req.isAuthenticated();
  next();
});
app.use("/", homeRouter);
app.use("/login", loginRouter);
app.use("/signup", signupRouter);

app.use(function (error, req, res, next) {
  console.log(error);

  res.status(error.statusCode || 500).send(error.message);
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
