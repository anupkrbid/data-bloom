class ResponseError extends Error {
  constructor(message, status, details) {
    super(message);
    this.name = this.constructor.name; // Set the name of the error
    this.status = status; // Add the status field
    if (details) {
      this.details = details; // Add the status field
    }
    Error.captureStackTrace(this, this.constructor); // Maintain proper stack trace
  }
}

module.exports = { ResponseError };
