const path = require('path');
const multer = require('multer');
const ApiError = require('../utils/ApiError');

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// Expanded list of acceptable MIME types for PDF and DOCX
const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'application/x-pdf',
  'application/vnd.pdf',
  'application/octet-stream', // Fallback when client auto-detection fails
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/msword',
];

const ALLOWED_EXTENSIONS = ['.pdf', '.docx', '.doc'];

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  const isMimeValid = ALLOWED_MIME_TYPES.includes(file.mimetype);
  const isExtValid = ALLOWED_EXTENSIONS.includes(ext);

  // Allow if either the MIME type matches or the file extension is valid
  if (isMimeValid || isExtValid) {
    cb(null, true);
  } else {
    cb(
      new ApiError(
        400,
        'Invalid file type. Only PDF and DOCX files are allowed'
      ),
      false
    );
  }
};

const upload = multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter,
});

module.exports = upload;
