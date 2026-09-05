const analyticsService = require('../services/analytics.service.js');
const ApiResponse = require('../utils/ApiResponse.js');

const ALLOWED_RANGES = ['30d', '90d', 'all'];

const getSummary = async (req, res) => {
  const userId = req.dbUserId;
  const rawRange = req.query.range;

  const range = ALLOWED_RANGES.includes(rawRange) ? rawRange : '30d';

  const summary = await analyticsService.getAnalyticsSummary({ userId, range });

  res
    .status(200)
    .json(
      new ApiResponse(200, summary, 'Analytics summary retrieved successfully')
    );
};

module.exports = { getSummary };
