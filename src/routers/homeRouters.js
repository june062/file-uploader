const { Router } = require("express");
const homeControllers = require("../controllers/homeControllers");
const allFoldersControllers = require("../controllers/allFoldersControllers");
const allFilesControllers = require("../controllers/allFilesControllers");
const homeRouter = Router();
const allFoldersRouter = Router({ mergeParams: true });
const allFilesRouter = Router({ mergeParams: true });

homeRouter.get("/", homeControllers.getHomePage);
homeRouter.get("/logout", homeControllers.logout);
homeRouter.get("/fileForm", homeControllers.getFileForm);
homeRouter.get("/folderForm", homeControllers.getFolderForm);
homeRouter.get(
  "/folderForm/:folderID/update",
  homeControllers.updateFolderPage
);
homeRouter.post(
  "/folderForm/:folderID/update/submit",
  homeControllers.submitFolderUpdate
);

homeRouter.post("/folderForm/submit", homeControllers.submitFolderForm);
homeRouter.post("/fileForm/submit", homeControllers.submitFileForm);

/* allFolders routes */
homeRouter.use("/allFolders", allFoldersRouter);
allFoldersRouter.get("/", allFoldersControllers.getAllFolders);
allFoldersRouter.get("/:folderID", allFoldersControllers.getFolderContents);
allFoldersRouter.get(
  "/:folderID/delete",
  allFoldersControllers.deleteFolderAndContents
);

/* allFiles routes */
homeRouter.use("/allFiles", allFilesRouter);
allFilesRouter.get("/", allFilesControllers.getAllFiles);
allFilesRouter.get("/:fileID", allFilesControllers.getFileInfo);

module.exports = homeRouter;
