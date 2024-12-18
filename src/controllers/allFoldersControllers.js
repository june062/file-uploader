const authMiddleware = require("../middleware/authMiddleware");
const queries = require("../models/queries");
const validationMiddleware = [];
const { cloudinary } = require("./homeControllers");

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
      const { files } = await queries.getFolderContents(
        Number(req.params.folderID)
      );

      for (const file of files) {
        cloudinary.uploader.destroy(file.name);
      }
      next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  async function (req, res, next) {
    try {
      await queries.deleteFolderAndContents(Number(req.params.folderID));

      res.redirect("/allFolders");
    } catch (error) {
      next(error);
    }
  },
];

module.exports = {
  getAllFolders,
  getFolderContents,
  deleteFolderAndContents,
};
