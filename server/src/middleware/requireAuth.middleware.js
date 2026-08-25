/**
 * Middleware to enforce authentication on protected routes.
 * Verifies the Clerk session token and attaches authentication state to req.auth.
 */

const { getAuth } = require('@clerk/express');
const ApiError = require('../utils/ApiError.js');

const requireAuth = (req, res, next) => {
  try {
    const auth = getAuth(req);

    if (!auth || !auth.userId) {
      return next(
        new ApiError(
          401,
          'Unauthorized: Authentication token is missing or invalid'
        )
      );
    }

    req.auth = auth;

    return next();
  } catch {
    return next(
      new ApiError(401, 'Unauthorized: Failed to authenticate request')
    );
  }
};

module.exports = requireAuth;
