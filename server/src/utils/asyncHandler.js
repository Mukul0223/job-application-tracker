/**
 * A wrapper function that automatically catchs error inside a async/await functions
 */

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => next(err));
};

module.exports = asyncHandler;
