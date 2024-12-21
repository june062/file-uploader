class folderCreationError extends Error {
  constructor(message) {
    super(message);
    this.status = 409;
    this.name = "FolderNameError";
  }
}
module.exports = folderCreationError;
