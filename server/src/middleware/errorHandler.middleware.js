/**
 * Global error handler for all the error
 */

const multer = require('multer');
const ApiError = require('../utils/ApiError.js');

const errorHandler = (err, req, res, _next) => {
  let normalizedError = err;

  // Intercept Multer operational errors and convert them to 400 ApiError instances
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      normalizedError = new ApiError(400, 'File size exceeds the 5MB limit');
    } else {
      normalizedError = new ApiError(400, err.message);
    }
  }

  const isApiError = normalizedError instanceof ApiError;

  const statusCode = isApiError ? normalizedError.statusCode : 500;
  const message = isApiError ? normalizedError.message : 'Something went wrong';
  const details = isApiError ? normalizedError.details : undefined;

  if (!isApiError) {
    console.error(err);
  }

  res.status(statusCode).json({
    statusCode,
    message,
    ...(details && { details }),
  });
};

module.exports = errorHandler;
