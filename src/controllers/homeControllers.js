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
    res.render("forms/fileForm");
  },
];
const getFolderForm = [
  authMiddleware.isLoggedIn,
  function (req, res, next) {
    res.render("forms/folderForm");
  },
];

const getAllFiles = [
  authMiddleware.isLoggedIn,
  function (req, res, next) {
    try {
      res.render("allFiles");
    } catch (error) {
      next(error);
    }
  },
];

const getAllFolders = [
  authMiddleware.isLoggedIn,
  function (req, res, next) {
    try {
      res.render("allFolders");
    } catch (error) {
      next(error);
    }
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

const getFolderContents = [
  authMiddleware.isLoggedIn,
  async function (req, res, next) {
    try {
      const folderContents = await queries.getFolderContents(
        Number(req.params.folderID)
      );

      res.render("folderContents", {
        folderContents: folderContents.files,
        header: folderContents.name,
        id: folderContents.id,
      });
    } catch (error) {
      next(error);
    }
  },
];

const deleteFolderAndContents = [
  authMiddleware.isLoggedIn,
  async function (req, res, next) {
    try {
      await queries.deleteFolderAndContents(Number(req.params.folderID));
      res.redirect("/allFolders");
    } catch (error) {
      next(error);
    }
  },
];

const getFileInfo = [
  authMiddleware.isLoggedIn,
  async function (req, res, next) {
    try {
      const fileInfo = await queries.getFileInfo(Number(req.params.fileID));
      res.render("fileInfo", { fileInfo: fileInfo });
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
  submitFolderForm,
  submitFileForm,
  getFolderContents,
  deleteFolderAndContents,
  getFileInfo,
};
