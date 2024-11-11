const { Router } = require("express");
const loginControllers = require("../controllers/loginControllers");
const loginRouter = Router();

loginRouter.get("/", loginControllers.getLoginPage);
loginRouter.post("/submit", loginControllers.loginPost);

module.exports = loginRouter;
