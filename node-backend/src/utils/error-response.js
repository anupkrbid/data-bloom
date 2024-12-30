class ResponseError extends Error {
  constructor(message, status, error) {
    super(message);
    this.name = this.constructor.name; // Set the name of the error
    this.status = status; // Add the status field
    if (error) {
      this.error = error; // Add the status field
    }
    Error.captureStackTrace(this, this.constructor); // Maintain proper stack trace
  }
}

module.exports = { ResponseError };
