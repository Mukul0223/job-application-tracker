import KanbanBoard from '../components/kanban/KanbanBoard.jsx';
import { useApplicationsBoard } from '../hooks/useApplications';

export default function KanbanPage() {
  const { applications, isLoading, isError, error } = useApplicationsBoard();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <p className="text-gray-500 animate-pulse">Loading Kanban board...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-md">
        <p className="font-semibold">Error loading applications</p>
        <p className="text-sm">
          {error?.message || 'Failed to fetch application data.'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Application Pipeline
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Drag and drop cards between status lanes to manage your job search
          pipeline.
        </p>
      </div>

      <KanbanBoard applications={applications || []} />
    </div>
  );
}
