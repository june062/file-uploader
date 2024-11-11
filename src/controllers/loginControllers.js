const queries = require("../models/queries");
const passport = require("passport");
const validationMiddleware = [];

const getLoginPage = [
  function (req, res, next) {
    try {
      res.render("loginPage");
    } catch (error) {
      next(error);
    }
  },
];
const loginPost = [
  validationMiddleware,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "login",
  }),
];
module.exports = { getLoginPage, loginPost };
