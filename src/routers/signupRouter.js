const { Router } = require("express");
const signupControllers = require("../controllers/signupControllers");
const signupRouter = Router();

signupRouter.get("/", signupControllers.getSignupPage);
signupRouter.post("/submit", signupControllers.signupPost);

module.exports = signupRouter;
