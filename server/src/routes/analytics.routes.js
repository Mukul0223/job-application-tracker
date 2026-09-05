const analyticsController = require('../controllers/analytics.controller.js');
const requireAuth = require('../middleware/requireAuth.middleware.js');
const resolveUser = require('../middleware/resolveUser.middleware.js');
const asyncHandler = require('../utils/asyncHandler.js');

const router = require('express').Router();

router.use(requireAuth, resolveUser);

router.get('/summary', asyncHandler(analyticsController.getSummary));

module.exports = router;
