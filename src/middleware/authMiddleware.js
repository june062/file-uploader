function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send("You cant access this resource");
  }
}

module.exports = {
  isLoggedIn,
};
