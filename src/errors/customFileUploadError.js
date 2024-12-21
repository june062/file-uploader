class fileUploadError extends Error {
  constructor(message) {
    super(message);
    this.status = 500;
    this.name = "FileUploadError";
  }
}

module.exports = fileUploadError;
