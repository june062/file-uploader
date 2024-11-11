const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });
const path = require("node:path");
const express = require("express");
const app = express();
const passport = require("passport");
const expressSession = require("express-session");
const PostgresConnection = require("connect-pg-simple")(expressSession);
const prisma = require("./models/pool");
const homeRouter = require("./routers/homeRouters");
const loginRouter = require("./routers/loginRouter");
const signupRouter = require("./routers/signupRouter");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: false }));
const sessionStore = new PostgresConnection({
  pool: prisma,
});

app.use(
  new expressSession({
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
  })
);
require("./config/passportConf");
app.use(passport.session());

const PORT = process.env.DEV_PORT || 3000;

app.use("/", homeRouter);
app.use("/login", loginRouter);
app.use("/signup", signupRouter);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
