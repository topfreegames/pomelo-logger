class CustomError extends Error {
  constructor(payload, ...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }

    // Custom debugging information
    this.payload = payload;
  }
}

function errorBuilder(errorCode) {
  return (text, innerError) => {
    const payload = {};
    payload.code = errorCode;
    payload.alreadyReported = false;
    if (innerError instanceof CustomError) {
      payload.innerError = innerError;
    }
    return new CustomError(payload, text || '');
  };
}

module.exports = {
  errorBuilder,
  CustomError
}