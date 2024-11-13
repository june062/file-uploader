const { Router } = require("express");
const homeControllers = require("../controllers/homeControllers");
const homeRouter = Router();

homeRouter.get("/", homeControllers.getHomePage);
homeRouter.get("/logout", homeControllers.logout);
homeRouter.get("/fileForm", homeControllers.getFileForm);
homeRouter.get("/folderForm", homeControllers.getFolderForm);
homeRouter.get("/allFiles", homeControllers.getAllFiles);
homeRouter.get("/allFolders", homeControllers.getAllFolders);
homeRouter.get("/allFolders/:folderID", homeControllers.getFolderContents);
homeRouter.get(
  "/allFolders/:folderID/delete",
  homeControllers.deleteFolderAndContents
);
homeRouter.get(
  "/folderForm/:folderID/update",
  homeControllers.updateFolderPage
);
homeRouter.post(
  "/folderForm/:folderID/update/submit",
  homeControllers.submitFolderUpdate
);
homeRouter.get("/allFiles/:fileID", homeControllers.getFileInfo);

homeRouter.post("/folderForm/submit", homeControllers.submitFolderForm);
homeRouter.post("/fileForm/submit", homeControllers.submitFileForm);

module.exports = homeRouter;
