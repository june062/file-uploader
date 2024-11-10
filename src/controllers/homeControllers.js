const getHomePage = [
  /* authentication middleware */
  function (req, res, next) {
    res.render("homePage");
  },
];

module.exports = { getHomePage };
