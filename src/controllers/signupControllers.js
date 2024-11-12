const crypt = require("bcryptjs");
const queries = require("../models/queries");
const validationMiddleware = [];
const getSignupPage = [
  function (req, res, next) {
    try {
      res.render("signupPage");
    } catch (error) {
      next(error);
    }
  },
];
const signupPost = [
  validationMiddleware,
  async function (req, res, next) {
    try {
      const password = await crypt.hash(req.body.password, 12);

      await queries.createUser(
        req.body.firstName,
        req.body.lastName,
        req.body.username,
        password
      );

      res.redirect("/login");
    } catch (error) {
      return next(error);
    }
  },
];
module.exports = {
  getSignupPage,
  signupPost,
};
