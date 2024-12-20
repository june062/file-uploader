class customSignupError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
    this.name = "failedSignupError";
  }
}

module.exports = customSignupError;
