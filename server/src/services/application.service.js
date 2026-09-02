const Application = require('../models/Application.model.js');
const ApiError = require('../utils/ApiError');

// Sort whitelist mapping to protect database internal fields from query injection
const SORT_WHITELIST = {
  date: { applicationDate: -1 },
  company: { companyName: -1 },
  status: { status: 1 },
  updated: { updatedAt: -1 },
};

/**
 * List paginated, filtered, searched, and sorted applications for a user
 */
const listApplications = async ({
  userId,
  status,
  search,
  sortBy = 'date',
  page = 1,
  limit = 10,
}) => {
  const parsedPage = Math.max(1, parseInt(page, 10) || 1);
  const parsedLimit = Math.max(1, parseInt(limit, 10) || 10);
  const skip = (parsedPage - 1) * parsedLimit;

  // 1. Base query filter MUST always include userId
  const filter = { userId };

  // 2. Conditionally filter by status
  if (status) {
    filter.status = status;
  }

  // 3. Conditionally filter by companyName (case-insensitive partial regex match)
  if (search) {
    filter.companyName = { $regex: search, $options: 'i' };
  }

  // 4. Fallback to default sorting if client passes an unwhitelisted key
  const sortOption = SORT_WHITELIST[sortBy] || SORT_WHITELIST.date;

  // 5. Run standard query and document count concurrently for performance
  const [applications, total] = await Promise.all([
    Application.find(filter).sort(sortOption).skip(skip).limit(parsedLimit),
    Application.countDocuments(filter),
  ]);

  return {
    applications,
    total,
    page: parsedPage,
  };
};

/**
 * Get unpaginated lightweight projection of applications for Kanban view
 */
const getBoardApplications = async ({ userId }) => {
  return await Application.find({ userId })
    .select('companyName jobTitle status applicationDate')
    .lean();
};

/**
 * Get single application by ID scoped to the authenticated user
 */
const getApplicationById = async ({ userId, id }) => {
  // NOTE: Deferred .populate('interviews') to Milestone 6 when the Interview model exists
  const application = await Application.findOne({ _id: id, userId });

  if (!application) {
    throw new ApiError(404, 'Application not found');
  }

  return application;
};

/**
 * Create a new application with explicitly injected userId
 */
const createApplication = async ({ userId, data }) => {
  return await Application.create({
    ...data,
    userId, // Enforces ownership; ignores any userId passed inside data payload
  });
};

/**
 * Full application update with schema validation re-enabled
 */
const updateApplication = async ({ userId, id, data }) => {
  const updatedApplication = await Application.findOneAndUpdate(
    { _id: id, userId },
    data,
    { returnDocument: 'after', runValidators: true }
  );

  if (!updatedApplication) {
    throw new ApiError(404, 'Application not found');
  }

  return updatedApplication;
};

/**
 * Status-only update (e.g. Kanban card drag-and-drop)
 */
const updateApplicationStatus = async ({ userId, id, status }) => {
  const updatedApplication = await Application.findOneAndUpdate(
    { _id: id, userId },
    { status },
    { returnDocument: 'after', runValidators: true }
  );

  if (!updatedApplication) {
    throw new ApiError(404, 'Application not found');
  }

  return updatedApplication;
};

/**
 * Delete an application scoped to the authenticated user
 */
const deleteApplication = async ({ userId, id }) => {
  const deletedApplication = await Application.findOneAndDelete({
    _id: id,
    userId,
  });

  if (!deletedApplication) {
    throw new ApiError(404, 'Application not found');
  }

  return deletedApplication;
};

module.exports = {
  listApplications,
  getBoardApplications,
  getApplicationById,
  createApplication,
  updateApplication,
  updateApplicationStatus,
  deleteApplication,
};
