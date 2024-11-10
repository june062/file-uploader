require("dotenv").config();
const path = require("node:path");
const express = require("express");
const app = express();
const loginRouter = require("./routers/loginRouter");
const homeRouter = require("./routers/homeRouters");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const PORT = process.env.DEV_PORT || 3000;

app.use("/", homeRouter);
app.use("/login", loginRouter);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
