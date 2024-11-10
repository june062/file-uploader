const getLoginPage = [
  /* authentication middleware */
  function (req, res, next) {
    try {
      res.render("loginPage");
    } catch (error) {
      next(error);
    }
  },
];

module.exports = { getLoginPage };
