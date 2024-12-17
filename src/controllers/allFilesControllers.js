const authMiddleware = require("../middleware/authMiddleware");
const queries = require("../models/queries");
const validationMiddleware = [];
const cloudinary = require("./homeControllers");

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
      console.log(fileInfo);
      res.render("fileInfo", { fileInfo: fileInfo, header: fileInfo.name });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
];

module.exports = {
  getAllFiles,
  getFileInfo,
};
