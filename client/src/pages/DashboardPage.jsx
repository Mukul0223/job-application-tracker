import {
  useApplications,
  useCreateApplication,
} from '../hooks/useApplications';
import { Plus, Loader2, AlertCircle, Briefcase } from 'lucide-react';

const DashboardPage = () => {
  const {
    data: applicationsData,
    isLoading,
    isError,
    error,
  } = useApplications();
  const createApplicationMutation = useCreateApplication();

  // Safely extract the array regardless of whether backend returns a direct array or a paginated object
  const applications = Array.isArray(applicationsData)
    ? applicationsData
    : applicationsData?.applications || applicationsData?.docs || [];

  const handleAddTest = () => {
    createApplicationMutation.mutate({
      companyName: `Company ${Math.floor(Math.random() * 1000)}`,
      jobTitle: 'Full Stack Engineer',
      status: 'Applied',
    });
  };

  // 1. Loading State
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-75 text-gray-500">
        <Loader2 className="mr-2 h-6 w-6 animate-spin text-blue-600" />
        <span>Fetching live applications from backend...</span>
      </div>
    );
  }

  // 2. Error State
  if (isError) {
    return (
      <div className="flex items-center p-4 m-6 text-red-800 bg-red-50 rounded-lg border border-red-200">
        <AlertCircle className="mr-2 h-5 w-5 shrink-0" />
        <span>Error fetching applications: {error.message}</span>
      </div>
    );
  }

  // 3. Success State
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <button
          onClick={handleAddTest}
          disabled={createApplicationMutation.isPending}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {createApplicationMutation.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Plus className="h-4 w-4" />
          )}
          Add Test Application
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Your Live Applications
        </h2>

        {applications.length === 0 ? (
          <p className="text-gray-500 text-sm">
            No applications found in Atlas database.
          </p>
        ) : (
          <ul className="divide-y divide-gray-100">
            {applications.map((app) => (
              <li
                key={app._id}
                className="py-3 flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <Briefcase className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {app.company || app.companyName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {app.position || app.jobTitle || 'Software Engineer'}
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-slate-100 text-slate-700">
                  {app.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
