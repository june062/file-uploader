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
    failureRedirect: "/",
  }),
  function (req, res, next) {
    console.log(req.user);
    res.redirect("/");
  },
];

module.exports = { getLoginPage, loginPost, validationMiddleware };
