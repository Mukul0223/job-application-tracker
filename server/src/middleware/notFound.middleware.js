/**
 * Fowards an error to errorHandler when a route is not found
 */

const ApiError = require('../utils/ApiError.js');

const notFound = (req, res, next) => {
  next(new ApiError(404, 'Not Found'));
};

module.exports = notFound;
