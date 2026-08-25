const userController = require('../controllers/user.controller.js');
const requireAuth = require('../middleware/requireAuth.middleware.js');
const asyncHandler = require('../utils/asyncHandler.js');
const router = require('express').Router();

router.post('/sync', requireAuth, asyncHandler(userController.syncUser));
router.get('/me', requireAuth, asyncHandler(userController.getMe));

module.exports = router;
