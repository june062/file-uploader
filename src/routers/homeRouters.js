const { Router } = require("express");
const homeControllers = require("../controllers/homeControllers");
const homeRouter = Router();

homeRouter.get("/", homeControllers.getHomePage);
homeRouter.get("/logout", homeControllers.logout);
homeRouter.get("/fileForm", homeControllers.getFileForm);
homeRouter.get("/folderForm", homeControllers.getFolderForm);
homeRouter.get("/allFiles", homeControllers.getAllFiles);
homeRouter.get("/allFolders", homeControllers.getAllFolders);

module.exports = homeRouter;
