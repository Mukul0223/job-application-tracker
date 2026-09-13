const Application = require('../models/Application.model.js');
const Interview = require('../models/Interview.model.js');
const ApiError = require('../utils/ApiError.js');

const listInterviews = async ({ userId, upcoming, applicationId }) => {
  const filter = { userId };

  if (applicationId) {
    filter.applicationId = applicationId;
  }

  if (upcoming) {
    filter.scheduledAt = { $gte: new Date() };
  }

  const sortOption = upcoming ? { scheduledAt: 1 } : { scheduledAt: -1 };

  const interviews = await Interview.find(filter).sort(sortOption);

  return interviews;
};

const createInterview = async ({ userId, data }) => {
  const application = await Application.findOne({
    _id: data.applicationId,
    userId,
  });

  if (!application) {
    throw new ApiError(404, 'Application not found');
  }

  const interview = await Interview.create({
    ...data,
    userId,
  });

  return interview;
};

const updateInterview = async ({ userId, id, data }) => {
  const interview = await Interview.findOneAndUpdate(
    {
      _id: id,
      userId,
    },
    data,
    { returnDocument: 'after', runValidators: true }
  );

  if (!interview) {
    throw new ApiError(404, 'Interview not found');
  }

  return interview;
};

const deleteInterview = async ({ userId, id }) => {
  const interview = await Interview.findOneAndDelete({ _id: id, userId });

  if (!interview) {
    throw new ApiError(404, 'Interview not found');
  }

  return interview;
};

module.exports = {
  listInterviews,
  createInterview,
  updateInterview,
  deleteInterview,
};
