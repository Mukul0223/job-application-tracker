import { useState } from 'react';
import { useAnalyticsSummary } from '@/hooks/useAnalytics';
import { TrendChart } from '@/components/analytics/TrendChart';
import { ResponseRateChart } from '@/components/analytics/ResponseRateChart';
import { ConversionFunnelChart } from '@/components/analytics/ConversionFunnelChart';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const AnalyticsPage = () => {
  const [range, setRange] = useState('30d');
  const { data, isLoading, isError, error } = useAnalyticsSummary(range);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-100 p-8!">
        <div className="flex flex-col items-center gap-3!">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground font-medium">
            Loading analytics data...
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8! text-center rounded-xl bg-destructive/10 border border-destructive/20 text-destructive my-6!">
        <p className="font-semibold text-base mb-1!">
          Failed to load analytics
        </p>
        <p className="text-sm opacity-90">
          {error?.message ||
            'Something went wrong while fetching analytics metrics.'}
        </p>
      </div>
    );
  }

  const { trend = [], responseRate = 0, byStatus = {} } = data || {};

  return (
    <div className="p-6! md:p-8! max-w-full mx-auto space-y-8!">
      {/* Page Header & Range Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4! pb-2!">
        <div>
          <h1 className="text-2xl! md:text-3xl! font-bold text-foreground tracking-tight">
            Analytics Overview
          </h1>
          <p className="text-sm text-muted-foreground mt-1!">
            Track application pipeline metrics, response rates, and daily
            trends.
          </p>
        </div>

        <div className="w-full sm:w-45">
          <Select value={range} onValueChange={setRange}>
            <SelectTrigger className="w-full h-10! px-4! py-2! rounded-lg">
              <SelectValue placeholder="Select Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="90d">Last 90 Days</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Top Metrics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6!">
        <div className="lg:col-span-1">
          <ResponseRateChart responseRate={responseRate} />
        </div>

        <div className="lg:col-span-2">
          <ConversionFunnelChart byStatus={byStatus} />
        </div>
      </div>

      {/* Full-Width Trend Chart */}
      <div>
        <TrendChart trend={trend} />
      </div>
    </div>
  );
};

export default AnalyticsPage;
