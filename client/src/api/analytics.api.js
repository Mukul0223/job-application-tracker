import axiosClient from './axiosClient.js';

const getAnalyticsSummary = async (params) => {
  const res = await axiosClient.get('/analytics', { params });
  return res.data.data;
};

export { getAnalyticsSummary };
