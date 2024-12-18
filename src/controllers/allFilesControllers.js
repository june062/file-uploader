const authMiddleware = require("../middleware/authMiddleware");
const queries = require("../models/queries");
const validationMiddleware = [];
const { cloudinary } = require("./homeControllers");

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

const getFileInfo = [
  authMiddleware.isLoggedIn,
  async function (req, res, next) {
    try {
      const fileInfo = await queries.getFileInfo(Number(req.params.fileID));
      res.render("fileInfo", { fileInfo: fileInfo, header: fileInfo.name });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
];
const deleteFile = [
  authMiddleware.isLoggedIn,
  async function (req, res, next) {
    try {
      const { name } = await queries.getFileInfo(Number(req.params.fileID));

      cloudinary.uploader.destroy(name);
      next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  async function (req, res, next) {
    try {
      await queries.deleteFile(Number(req.params.fileID));
      res.redirect("/allFiles");
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
];

module.exports = {
  getAllFiles,
  getFileInfo,
  deleteFile,
};
