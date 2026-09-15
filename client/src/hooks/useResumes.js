import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getResumes, uploadResume, deleteResume } from '../api/resumes.api';

// 1. Fetch All Resumes
export const useResumes = () => {
  return useQuery({
    queryKey: ['resumes'],
    queryFn: getResumes,
  });
};

// 2. Upload Resume Mutation
export const useUploadResume = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadResume,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resumes'] });
    },
  });
};

// 3. Delete Resume Mutation
export const useDeleteResume = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteResume,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resumes'] });
    },
  });
};
