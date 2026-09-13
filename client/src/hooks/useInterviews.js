import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getInterviews,
  createInterview,
  updateInterview,
  deleteInterview,
} from '@/api/interviews.api';

const useInterviews = (applicationId) => {
  return useQuery({
    queryKey: ['interviews', applicationId],
    queryFn: () => getInterviews({ applicationId }),
    enabled: Boolean(applicationId),
  });
};

const useCreateInterview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createInterview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['interviews'] });
    },
  });
};

const useUpdateInterview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateInterview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['interviews'] });
    },
  });
};

const useDeleteInterview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteInterview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['interviews'] });
    },
  });
};

export {
  useInterviews,
  useCreateInterview,
  useUpdateInterview,
  useDeleteInterview,
};
