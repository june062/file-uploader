const authMiddleware = require("../middleware/authMiddleware");
const queries = require("../models/queries");

const getHomePage = [
  authMiddleware.isLoggedIn,
  function (req, res, next) {
    try {
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
const getFileForm = [
  authMiddleware.isLoggedIn,
  function (req, res, next) {
    res.render("forms/fileForm");
  },
];
const getFolderForm = [
  authMiddleware.isLoggedIn,
  function (req, res, next) {
    res.render("forms/folderForm");
  },
];

const getAllFiles = [authMiddleware.isLoggedIn];

const getAllFolders = [
  authMiddleware.isLoggedIn,
  async function (req, res, next) {
    try {
      const userFolders = await queries.getUserFolders(req.user.id);
      res.render("allFolders", { userFolders: userFolders });
    } catch (error) {
      next(error);
    }
  },
];

module.exports = {
  getHomePage,
  logout,
  getFileForm,
  getFolderForm,
  getAllFolders,
  getAllFiles,
};
