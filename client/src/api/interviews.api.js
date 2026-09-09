import axiosClient from './axiosClient.js';

const getInterviews = async (params) => {
  const res = await axiosClient.get('/interviews', { params });
  return res.data.data;
};

const createInterview = async (data) => {
  const res = await axiosClient.post('/interviews', data);
  return res.data.data;
};

const updateInterview = async (id, data) => {
  const res = await axiosClient.patch(`/interviews/${id}`, data);
  return res.data.data;
};

const deleteInterview = async (id) => {
  const res = await axiosClient.delete(`/interviews/${id}`);
  return res.data.data;
};

export { getInterviews, createInterview, updateInterview, deleteInterview };
