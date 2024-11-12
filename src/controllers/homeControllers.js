const getHomePage = [
  /* authentication middleware */
  function (req, res, next) {
    try {
      res.locals.user = req.user;
      res.render("homePage");
    } catch (error) {
      next(error);
    }
  },
];

module.exports = { getHomePage };
