const authMiddleware = require("../middleware/authMiddleware");
const queries = require("../models/queries");
const validationMiddleware = [];

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
    res.render("forms/fileForm", { header: "Create a file" });
  },
];
const getFolderForm = [
  authMiddleware.isLoggedIn,
  function (req, res, next) {
    res.render("forms/folderForm", {
      header: "Create a folder",
      src: "/folderForm/submit",
    });
  },
];

const submitFolderForm = [
  authMiddleware.isLoggedIn,
  validationMiddleware,
  async function (req, res, next) {
    try {
      await queries.createFolder(req.user.id, req.body.folderName);
      res.redirect("/allFolders");
    } catch (error) {
      next(error);
    }
  },
];

const submitFileForm = [
  authMiddleware.isLoggedIn,
  async function (req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  },
];

const updateFolderPage = [
  authMiddleware.isLoggedIn,
  async function (req, res, next) {
    const folder = req.user.folders.find(
      (obj) => obj.id === +req.params.folderID
    );
    res.locals.folderName = folder.name;

    res.render("forms/folderForm", {
      header: "Update folder",
      src: `/folderForm/${req.params.folderID}/update/submit`,
    });
  },
];

const submitFolderUpdate = [
  authMiddleware.isLoggedIn,
  validationMiddleware,
  async function (req, res, next) {
    try {
      await queries.updateFolder(
        Number(req.params.folderID),
        req.body.folderName
      );

      res.redirect(`/allFolders/${req.params.folderID}`);
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
  submitFolderForm,
  submitFileForm,
  updateFolderPage,
  submitFolderUpdate,
};
