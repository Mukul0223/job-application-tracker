const ApiResponse = require('../utils/ApiResponse.js');
const applicationService = require('../services/application.service.js');

const listApplications = async (req, res) => {
  const result = await applicationService.listApplications({
    userId: req.dbUserId,
    ...req.query,
  });

  res.status(200).json(new ApiResponse(200, result, 'Applications retrieved'));
};

const getBoard = async (req, res) => {
  const result = await applicationService.getBoardApplications({
    userId: req.dbUserId,
  });

  res
    .status(200)
    .json(new ApiResponse(200, result, 'Applications board retrieved'));
};

const getApplicationById = async (req, res) => {
  const result = await applicationService.getApplicationById({
    userId: req.dbUserId,
    id: req.params.id,
  });

  res.status(200).json(new ApiResponse(200, result, 'Application retrieved'));
};

const createApplication = async (req, res) => {
  const result = await applicationService.createApplication({
    userId: req.dbUserId,
    data: req.body,
  });

  res
    .status(201)
    .json(new ApiResponse(201, result, 'Application created successfully'));
};

const updateApplication = async (req, res) => {
  const result = await applicationService.updateApplication({
    userId: req.dbUserId,
    id: req.params.id,
    data: req.body,
  });

  res
    .status(200)
    .json(new ApiResponse(200, result, 'Application updated successfully'));
};

const updateApplicationStatus = async (req, res) => {
  const result = await applicationService.updateApplicationStatus({
    userId: req.dbUserId,
    id: req.params.id,
    status: req.body.status,
  });

  res
    .status(200)
    .json(
      new ApiResponse(200, result, 'Application status updated successfully')
    );
};

const deleteApplication = async (req, res) => {
  const result = await applicationService.deleteApplication({
    userId: req.dbUserId,
    id: req.params.id,
  });

  res
    .status(200)
    .json(new ApiResponse(200, result, 'Application deleted successfully'));
};

module.exports = {
  listApplications,
  getBoard,
  getApplicationById,
  createApplication,
  updateApplication,
  updateApplicationStatus,
  deleteApplication,
};
