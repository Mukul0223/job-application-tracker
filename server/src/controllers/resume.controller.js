const resumeService = require('../services/resume.service.js');
const ApiResponse = require('../utils/ApiResponse.js');
const ApiError = require('../utils/ApiError.js');

const uploadResume = async (req, res) => {
  const userId = req.dbUserId;

  if (!req.file) {
    throw new ApiError(400, 'Please select and attach a file to upload');
  }

  const resume = await resumeService.uploadResume({ userId, file: req.file });

  res
    .status(201)
    .json(new ApiResponse(201, resume, 'Resume uploaded successfully'));
};

const listResumes = async (req, res) => {
  const resumes = await resumeService.listResumes({ userId: req.dbUserId });
  res
    .status(200)
    .json(new ApiResponse(200, resumes, 'Resumes retrieved successfully'));
};

const deleteResume = async (req, res) => {
  const resume = await resumeService.deleteResume({
    userId: req.dbUserId,
    id: req.params.id,
  });
  res
    .status(200)
    .json(new ApiResponse(200, resume, 'Resume deleted successfully'));
};

module.exports = {
  uploadResume,
  listResumes,
  deleteResume,
};
