const userService = require('../services/user.service.js');
const ApiResponse = require('../utils/ApiResponse.js');

const syncUser = async (req, res) => {
  const clerkId = req.auth.userId;
  const claims = req.auth.sessionClaims;

  const email = claims?.email;
  const firstName = claims?.first_name;
  const lastName = claims?.last_name;

  const user = await userService.syncUser({
    clerkId,
    email,
    firstName,
    lastName,
  });

  res.status(200).json(new ApiResponse(200, user, 'User synced successfully'));
};

const getMe = async (req, res) => {
  const clerkId = req.auth.userId;
  const user = await userService.getUserByClerkId(clerkId);

  res.status(200).json(new ApiResponse(200, user, 'User fetched successfully'));
};

module.exports = { syncUser, getMe };
