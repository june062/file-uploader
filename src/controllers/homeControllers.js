const getHomePage = [
  /* authentication middleware */
  function (req, res, next) {
    try {
      res.render("homePage");
    } catch (error) {
      next(error);
    }
  },
];

module.exports = { getHomePage };
