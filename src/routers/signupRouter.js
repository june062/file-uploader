const { Router } = require("express");
const signupControllers = require("../controllers/signupControllers");
const signupRouter = Router();

signupRouter.get("/", signupControllers.getSignupPage);
signupRouter.post("/", signupControllers.signupPost);

module.exports = signupRouter;
