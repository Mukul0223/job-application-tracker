const router = require('express').Router();
const asyncHandler = require('../utils/asyncHandler.js');
const applicationController = require('../controllers/application.controller.js');
const requireAuth = require('../middleware/requireAuth.middleware.js');
const resolveUser = require('../middleware/resolveUser.middleware.js');
const validate = require('../middleware/validate.middleware.js');
const {
  createApplicationSchema,
  updateApplicationSchema,
  updateStatusSchema,
} = require('../validators/application.validator.js');

// Protect and scope ALL application routes below
router.use(requireAuth, resolveUser);

// 1. List applications (Paginated, filtered, searched)
router.get('/', asyncHandler(applicationController.listApplications));

// 2. Kanban board view (Unpaginated, lightweight)
// MUST remain above GET /:id so "board" isn't captured as an ID
router.get('/board', asyncHandler(applicationController.getBoard));

// 3. Create new application
router.post(
  '/',
  validate(createApplicationSchema),
  asyncHandler(applicationController.createApplication)
);

// 4. Get single application by ID
router.get('/:id', asyncHandler(applicationController.getApplicationById));

// 5. Full/Partial update
router.patch(
  '/:id',
  validate(updateApplicationSchema),
  asyncHandler(applicationController.updateApplication)
);

// 6. Status-only update (Kanban drag-and-drop)
router.patch(
  '/:id/status',
  validate(updateStatusSchema),
  asyncHandler(applicationController.updateApplicationStatus)
);

// 7. Delete application
router.delete('/:id', asyncHandler(applicationController.deleteApplication));

module.exports = router;
