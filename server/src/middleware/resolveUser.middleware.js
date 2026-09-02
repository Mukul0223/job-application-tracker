/**
 * It take clerkId (userId) from req.auth then finds the user._id (mongodb _id) and attaches it to req.dbUserId
 */

const ApiError = require('../utils/ApiError.js');
const User = require('../models/User.model.js');

const resolveUser = async (req, res, next) => {
  try {
    const clerkId = req.auth?.userId;
    const user = await User.findOne({ clerkId });

    if (!user) {
      return next(new ApiError(404, 'User not found'));
    }

    req.dbUserId = user._id;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = resolveUser;
