const getSignupPage = [
  /* authentication middleware */
  function (req, res, next) {
    try {
      res.render("signupPage");
    } catch (error) {
      next(error);
    }
  },
];

module.exports = {
  getSignupPage,
};
