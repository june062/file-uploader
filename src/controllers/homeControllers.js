const authMiddleware = require("../middleware/authMiddleware");

const getHomePage = [
  function (req, res, next) {
    try {
      res.locals.user = req.user;
      res.render("homePage");
    } catch (error) {
      next(error);
    }
  },
];
const logout = [
  authMiddleware.isLoggedIn,
  function (req, res, next) {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/login");
    });
  },
];
module.exports = { getHomePage, logout };
