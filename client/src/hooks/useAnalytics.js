import { useQuery } from '@tanstack/react-query';
import { getAnalyticsSummary } from '../api/analytics.api.js'; // Adjust path to match your api folder structure

export const useAnalyticsSummary = (range) => {
  return useQuery({
    queryKey: ['analytics', range],
    queryFn: () => getAnalyticsSummary({ range }),
    enabled: Boolean(range),
  });
};
