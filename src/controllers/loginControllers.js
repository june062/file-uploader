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
    failureRedirect: "/login",
  }),
  function (req, res, next) {
    console.log("hello");
    res.locals.username = req.user.username;
    res.redirect("/");
  },
];

module.exports = { getLoginPage, loginPost };
