import { useUpcomingInterviews } from '../hooks/useInterviews';
import { CalendarView } from '../components/calendar/CalendarView';

export const CalendarPage = () => {
  const {
    data: interviews,
    isLoading,
    isError,
    refetch,
  } = useUpcomingInterviews();

  if (isLoading) {
    return (
      <div className="p-6 md:p-8 space-y-6">
        <div className="flex flex-col gap-2">
          <div className="h-8 w-48 bg-muted animate-pulse rounded-md" />
          <div className="h-4 w-96 bg-muted animate-pulse rounded-md" />
        </div>
        <div className="h-150 w-full bg-card rounded-xl border border-border/60 animate-pulse p-6" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 md:p-8 space-y-6">
        <div className="bg-destructive/10 border border-destructive/20 text-destructive rounded-xl p-6 flex flex-col gap-4 max-w-md">
          <p className="text-sm font-medium">
            Failed to load your upcoming interviews. Please try again.
          </p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 text-sm font-medium bg-destructive text-destructive-foreground rounded-md self-start hover:opacity-90 transition-opacity"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6! md:p-8 space-y-6 max-w-full mx-auto">
      <div className="flex flex-col gap-1 pb-2!">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Interview Calendar
        </h1>
        <p className="text-sm text-muted-foreground">
          Track and manage your upcoming interview schedule across all
          applications.
        </p>
      </div>

      <CalendarView interviews={interviews || []} />
    </div>
  );
};

export default CalendarPage;
