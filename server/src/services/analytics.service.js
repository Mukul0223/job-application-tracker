/**
 * Analytics Metric Definitions
 * ==========================================
 * Range Filtering: All metrics filter applications where `applicationDate`
 * falls within [startDate, endDate] (defaults to past 30 days if unspecified).
 *
 * 1. totalApplications
 *    - Definition: Total count of application records submitted/tracked in range.
 *    - Filter: applicationDate in range AND status != 'Wishlist' (or including Wishlist if tracked,
 *      but specifically total count of tracked application items in date range).
 *
 * 2. byStatus
 *    - Definition: Breakdown of application counts keyed by status value.
 *    - Keys: Wishlist, Applied, Screening, Interview, Offer, Rejected.
 *    - Range: Filtered by applicationDate.
 *
 * 3. responseRate
 *    - Definition: Percentage of submitted applications that received any company response.
 *    - Numerator: Count where status IN ('Screening', 'Interview', 'Offer', 'Rejected').
 *    - Denominator: Count where status != 'Wishlist' (Total submitted applications).
 *    - Formula: (Numerator / Denominator) * 100  (Returns 0 if Denominator == 0).
 *
 * 4. interviewConversionRate
 *    - Definition: Percentage of submitted applications that reached the interview stage or beyond.
 *    - Numerator: Count where status IN ('Interview', 'Offer').
 *    - Denominator: Count where status != 'Wishlist' (Total submitted applications).
 *    - Formula: (Numerator / Denominator) * 100  (Returns 0 if Denominator == 0).
 *    - Note: Simplified scope — does not cross-reference historical Interview docs for
 *      applications that ended in 'Rejected'.
 *
 * 5. trend
 *    - Definition: Aggregated array of application submission volume over time.
 *    - Shape: Array of { period: String, count: Number }
 *    - Bucketing Rule:
 *        * Range <= 30 days  => Daily buckets (YYYY-MM-DD)
 *        * Range > 30 days   => Weekly buckets (YYYY-WW / Start of Week)
 */

const mongoose = require('mongoose');
const Application = require('../models/Application.model.js');

const ALL_STATUSES = [
  'Wishlist',
  'Applied',
  'Screening',
  'Interview',
  'Offer',
  'Rejected',
];

/**
 * Helper to compute cutoff date based on range string parameter.
 */
const getCutoffDate = (range) => {
  const now = new Date();
  if (range === '90d') {
    const cutoff = new Date(now);
    cutoff.setDate(cutoff.getDate() - 90);
    return cutoff;
  }
  if (range === 'all') {
    return null;
  }
  // Default to '30d'
  const cutoff = new Date(now);
  cutoff.setDate(cutoff.getDate() - 30);
  return cutoff;
};

/**
 * Get analytics summary for a user within a specified range.
 * @param {Object} params
 * @param {string} params.userId - User ID string
 * @param {string} [params.range='30d'] - '30d' | '90d' | 'all'
 */
const getAnalyticsSummary = async ({ userId, range = '30d' }) => {
  // Explicitly cast string ID to Mongoose ObjectId for Aggregation Pipeline matching
  const userObjectId = new mongoose.Types.ObjectId(userId);
  const cutoffDate = getCutoffDate(range);

  // Shared $match stage leveraging { userId: 1, applicationDate: -1 } index
  const matchStage = {
    userId: userObjectId,
    ...(cutoffDate ? { applicationDate: { $gte: cutoffDate } } : {}),
  };

  // 1 & 2. Aggregate counts by status
  const statusCountsRaw = await Application.aggregate([
    { $match: matchStage },
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]);

  // Pre-fill all expected status keys with zero to guarantee full response shape
  const byStatus = ALL_STATUSES.reduce((acc, status) => {
    acc[status] = 0;
    return acc;
  }, {});

  let totalApplications = 0;

  statusCountsRaw.forEach(({ _id, count }) => {
    if (Object.prototype.hasOwnProperty.call(byStatus, _id)) {
      byStatus[_id] = count;
    }
    totalApplications += count;
  });

  // 3 & 4. Compute rates in JS from aggregated counts
  const submittedCount = totalApplications - (byStatus.Wishlist || 0);

  const respondedCount =
    (byStatus.Screening || 0) +
    (byStatus.Interview || 0) +
    (byStatus.Offer || 0) +
    (byStatus.Rejected || 0);

  const interviewedCount = (byStatus.Interview || 0) + (byStatus.Offer || 0);

  // Guard against division by zero for new users or empty ranges
  const responseRate =
    submittedCount > 0
      ? Math.round((respondedCount / submittedCount) * 100 * 100) / 100
      : 0;

  const interviewConversionRate =
    submittedCount > 0
      ? Math.round((interviewedCount / submittedCount) * 100 * 100) / 100
      : 0;

  // 5. Aggregate trend timeline
  const isDaily = range === '30d';
  const dateFormat = isDaily ? '%Y-%m-%d' : '%G-W%V';

  const trendRaw = await Application.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: {
          $dateToString: { format: dateFormat, date: '$applicationDate' },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  const trend = trendRaw.map((item) => ({
    period: item._id,
    count: item.count,
  }));

  return {
    totalApplications,
    byStatus,
    responseRate,
    interviewConversionRate,
    trend,
  };
};

module.exports = { getAnalyticsSummary };
