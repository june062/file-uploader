const crypt = require("bcryptjs");
const queries = require("../models/queries");
const validationMiddleware = [];
const customSignupError = require("../errors/customSignupError");
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
      /* Either bcrypt or prisma could both create an error, how would I know if a username already existing is actually the problem? Is try/catch block the best way to structure my code in situations like this?
       */
      return next(customSignupError("Username already exists!"));
    }
  },
];
module.exports = {
  getSignupPage,
  signupPost,
};
