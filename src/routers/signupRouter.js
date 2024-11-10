const { Router } = require("express");
const signupControllers = require("../controllers/signupControllers");
const signupRouter = Router();

signupRouter.get("/", signupControllers.getSignupPage);

module.exports = signupRouter;
