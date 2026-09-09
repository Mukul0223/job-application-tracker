import axiosClient from './axiosClient.js';

const getApplications = async (params) => {
  const res = await axiosClient.get('/applications', { params });
  return res.data.data;
};

const getApplicationsBoard = async () => {
  const res = await axiosClient.get('/applications/board');
  return res.data.data;
};

const getApplicationById = async (id) => {
  const res = await axiosClient.get(`/applications/${id}`);
  return res.data.data;
};

const createApplication = async (data) => {
  const res = await axiosClient.post('/applications', data);
  return res.data.data;
};

const updateApplication = async (id, data) => {
  const res = await axiosClient.patch(`/applications/${id}`, data);
  return res.data.data;
};

const updateApplicationStatus = async (id, status) => {
  const res = await axiosClient.patch(`/applications/${id}/status`, { status });
  return res.data.data;
};

const deleteApplication = async (id) => {
  const res = await axiosClient.delete(`/applications/${id}`);
  return res.data.data;
};

export {
  getApplications,
  getApplicationsBoard,
  getApplicationById,
  createApplication,
  updateApplication,
  updateApplicationStatus,
  deleteApplication,
};
