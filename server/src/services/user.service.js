const User = require('../models/User.model.js');
const ApiError = require('../utils/ApiError.js');

const syncUser = async ({ clerkId, email, firstName, lastName }) => {
  return await User.findOneAndUpdate(
    { clerkId },
    { email, firstName, lastName },
    { upsert: true, returnDocument: 'after' }
  );
};

const getUserByClerkId = async (clerkId) => {
  const user = await User.findOne({ clerkId });

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  return user;
};

module.exports = { syncUser, getUserByClerkId };
