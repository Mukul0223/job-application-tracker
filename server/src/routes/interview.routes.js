const interviewController = require('../controllers/interview.controller.js');
const asyncHandler = require('../utils/asyncHandler.js');
const requireAuth = require('../middleware/requireAuth.middleware.js');
const resolveUser = require('../middleware/resolveUser.middleware.js');
const validate = require('../middleware/validate.middleware.js');
const {
  createInterviewSchema,
  updateInterviewSchema,
} = require('../validators/interview.validator.js');
const router = require('express').Router();

router.use(requireAuth, resolveUser);

router.get('/', asyncHandler(interviewController.listInterviews));
router.post(
  '/',
  validate(createInterviewSchema),
  asyncHandler(interviewController.createInterview)
);
router.patch(
  '/:id',
  validate(updateInterviewSchema),
  asyncHandler(interviewController.updateInterview)
);
router.delete('/:id', asyncHandler(interviewController.deleteInterview));

module.exports = router;
