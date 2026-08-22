/**
 * Global error handler for all the error
 */

const ApiError = require('../utils/ApiError.js');

const errorHandler = (err, req, res, _next) => {
  const isApiError = err instanceof ApiError;

  const statusCode = isApiError ? err.statusCode : 500;
  const message = isApiError ? err.message : 'Something went wrong';
  const details = isApiError ? err.details : undefined;

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
