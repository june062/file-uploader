function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
    next();
  } else {
    res.status(401).redirect("/login");
  }
}

module.exports = {
  isLoggedIn,
};
