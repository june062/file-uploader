const { Router } = require("express");
const homeControllers = require("../controllers/homeControllers");
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
allFoldersRouter.get("/", homeControllers.getAllFolders);
allFoldersRouter.get("/:folderID", homeControllers.getFolderContents);
allFoldersRouter.get(
  "/:folderID/delete",
  homeControllers.deleteFolderAndContents
);

/* allFiles routes */
homeRouter.use("/allFiles", allFilesRouter);
allFilesRouter.get("/", homeControllers.getAllFiles);
allFilesRouter.get("/:fileID", homeControllers.getFileInfo);

module.exports = homeRouter;
