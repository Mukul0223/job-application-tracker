const resumeController = require('../controllers/resume.controller.js');
const requireAuth = require('../middleware/requireAuth.middleware.js');
const resolveUser = require('../middleware/resolveUser.middleware.js');
const asyncHandler = require('../utils/asyncHandler.js');
const upload = require('../middleware/upload.middleware.js');
const validate = require('../middleware/validate.middleware.js');
const { uploadResumeSchema } = require('../validators/resume.validator.js');

const router = require('express').Router();

router.use(requireAuth, resolveUser);

router.post(
  '/',
  upload.single('file'), // Form field name MUST be 'file'
  validate(uploadResumeSchema),
  asyncHandler(resumeController.uploadResume)
);
router.get('/', asyncHandler(resumeController.listResumes));
router.delete('/:id', asyncHandler(resumeController.deleteResume));

module.exports = router;
