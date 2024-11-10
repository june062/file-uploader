require("dotenv").config();
const path = require("node:path");
const express = require("express");
const app = express();
const homeRouter = require("./routers/homeRouters");
const loginRouter = require("./routers/loginRouter");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.DEV_PORT || 3000;

app.use("/", homeRouter);
app.use("/login", loginRouter);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
