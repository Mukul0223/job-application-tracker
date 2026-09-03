const interviewService = require('../services/interview.service.js');
const ApiResponse = require('../utils/ApiResponse.js');

const listInterviews = async (req, res) => {
  const userId = req.dbUserId;

  const upcoming = req.query.upcoming === 'true';

  const result = await interviewService.listInterviews({ userId, upcoming });

  res
    .status(200)
    .json(
      new ApiResponse(200, result, 'Interviews list retrieved successfully')
    );
};

const createInterview = async (req, res) => {
  const result = await interviewService.createInterview({
    userId: req.dbUserId,
    data: req.body,
  });

  res
    .status(201)
    .json(new ApiResponse(201, result, 'Interview created successfully'));
};

const updateInterview = async (req, res) => {
  const result = await interviewService.updateInterview({
    userId: req.dbUserId,
    id: req.params.id,
    data: req.body,
  });

  res
    .status(200)
    .json(new ApiResponse(200, result, 'Interview updated successfully'));
};

const deleteInterview = async (req, res) => {
  const result = await interviewService.deleteInterview({
    userId: req.dbUserId,
    id: req.params.id,
  });

  res
    .status(200)
    .json(new ApiResponse(200, result, 'Interview deleted successfully'));
};

module.exports = {
  listInterviews,
  createInterview,
  updateInterview,
  deleteInterview,
};
