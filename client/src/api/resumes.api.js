import axiosClient from './axiosClient.js';

const uploadResume = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const res = await axiosClient.post('/resumes', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return res.data.data;
};

const getResumes = async () => {
  const res = await axiosClient.get('/resumes');
  return res.data.data;
};

const deleteResume = async (id) => {
  const res = await axiosClient.delete(`/resumes/${id}`);
  return res.data.data;
};

export { uploadResume, getResumes, deleteResume };
