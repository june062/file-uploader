const authMiddleware = require("../middleware/authMiddleware");
const queries = require("../models/queries");
const validationMiddleware = [];

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
async function handleUpload(file, fileName) {
  const options = {
    use_filename: true,
    unique_filename: true,
    overwrite: true,
  };
  try {
    const res = await cloudinary.uploader.upload(file, {
      public_id: fileName,
      resource_type: "auto",
      eager: [{ flags: "attachment" }],
    });
    return res;
  } catch (error) {
    return error;
  }
}

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
    res.render("forms/fileForm", {
      header: "Create a file",
      src: "/fileForm/submit",
    });
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
  upload.single("file"),
  async function (req, res, next) {
    try {
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
      const cldRes = await handleUpload(dataURI, req.body.fileName);
      console.log(cldRes);

      await queries.storeFileInfo(
        req.body.fileName,
        `${cldRes.bytes}`,
        cldRes.format,
        cldRes.eager[0].url,
        Number(req.body.selectFolder),
        Number(req.user.id)
      );
      res.redirect("/allFiles");
    } catch (error) {
      console.log(error);
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
const updateFilePage = [
  authMiddleware.isLoggedIn,
  async function (req, res, next) {
    const fileInfo = await queries.getFileInfo(Number(req.params.fileID));
    res.locals.fileName = fileInfo.name;
    res.render("forms/fileForm", {
      header: "Update Folder",
      src: `/fileForm/${req.params.fileID}/update/submit`,
    });
  },
];
const submitFileUpdate = [
  authMiddleware.isLoggedIn,
  validationMiddleware,
  upload.single("file"),
  async function (req, res, next) {
    try {
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
      const cldRes = await handleUpload(dataURI);

      await queries.updateFile(
        Number(req.params.fileID),
        req.body.fileName,
        `${cldRes.bytes}`,
        cldRes.format,
        cldRes.url,
        Number(req.body.selectFolder),
        Number(req.user.id)
      );
      next();
    } catch (error) {
      next(error);
    }
  },
  function (req, res) {
    res.redirect(`/allFiles/${req.params.fileID}`);
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
  updateFilePage,
  submitFileUpdate,
  cloudinary,
};
