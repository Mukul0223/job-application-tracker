import axiosClient from './axiosClient.js';

const getAnalyticsSummary = async (params) => {
  const res = await axiosClient.get('/analytics/summary', { params });
  return res.data.data;
};

export { getAnalyticsSummary };
