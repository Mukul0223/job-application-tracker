import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getApplications,
  getApplicationsBoard,
  getApplicationById,
  createApplication,
  updateApplication,
  updateApplicationStatus,
  deleteApplication,
} from '../api/applications.api';

// 1. Fetch Paginated / Filtered List
export const useApplications = (filters = {}) => {
  return useQuery({
    queryKey: ['applications', filters],
    queryFn: () => getApplications(filters),
  });
};

// 2. Fetch Board Layout Data
export const useApplicationsBoard = () => {
  return useQuery({
    queryKey: ['applications', 'board'],
    queryFn: getApplicationsBoard,
  });
};

// 3. Fetch Single Application by ID
export const useApplication = (id) => {
  return useQuery({
    queryKey: ['applications', id],
    queryFn: () => getApplicationById(id),
    enabled: !!id, // Only run query if ID is defined (prevents unnecessary 404s)
  });
};

// 4. Create Application Mutation
export const useCreateApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createApplication,
    onSuccess: () => {
      // Refresh all cached queries matching ['applications', ...]
      queryClient.invalidateQueries({ queryKey: ['applications'] });
    },
  });
};

// 5. Optimistic Status Update Mutation (Kanban Drag-and-Drop)
export const useUpdateApplicationStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }) => updateApplicationStatus(id, status),

    // Step A: Runs BEFORE the network call goes out
    onMutate: async ({ id, status }) => {
      // Cancel any outgoing refetches so they don't overwrite our optimistic update
      await queryClient.cancelQueries({ queryKey: ['applications', 'board'] });

      // Snapshot the current cache value before modifying
      const previous = queryClient.getQueryData(['applications', 'board']);

      // Optimistically update the local cache array (must return a NEW array reference)
      queryClient.setQueryData(['applications', 'board'], (old) =>
        old?.map((app) => (app._id === id ? { ...app, status } : app))
      );

      // Return context containing the rollback snapshot
      return { previous };
    },

    // Step B: Runs ONLY if the network request throws an error
    onError: (err, vars, context) => {
      // Restore previous state snapshot captured in onMutate
      queryClient.setQueryData(['applications', 'board'], context.previous);
    },

    // Step C: Runs ALWAYS after success or error
    onSettled: () => {
      // Re-sync with backend data to ensure full consistency
      queryClient.invalidateQueries({ queryKey: ['applications'] });
    },
  });
};

// 6. Update Application Details Mutation
export const useUpdateApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateApplication(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
    },
  });
};

// 7. Delete Application Mutation
export const useDeleteApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
    },
  });
};
