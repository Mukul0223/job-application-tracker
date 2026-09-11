import { useState } from 'react';
import { useApplications } from '../hooks/useApplications';
import ApplicationTable from '../components/applications/ApplicationTable';
import ApplicationFilters from '../components/applications/ApplicationFilters';
import ApplicationForm from '../components/applications/ApplicationForm';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import { Plus, Loader2, AlertCircle } from 'lucide-react';

const DashboardPage = () => {
  // Page-level filter state passed into useApplications and ApplicationFilters
  const [filters, setFilters] = useState({
    search: undefined,
    status: undefined,
    sortBy: 'date',
    sortOrder: 'desc',
  });

  // Dialog state for create / edit modal
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingApplication, setEditingApplication] = useState(null);

  // Fetch applications with active filters via TanStack Query
  const { data, isLoading, isError, error } = useApplications(filters);

  const handleOpenCreateModal = () => {
    setEditingApplication(null);
    setIsDialogOpen(true);
  };

  const handleOpenEditModal = (application) => {
    setEditingApplication(application);
    setIsDialogOpen(true);
  };

  const handleCloseModal = () => {
    setIsDialogOpen(false);
    setEditingApplication(null);
  };

  const applications = data?.applications || [];

  return (
    <div className="min-h-screen bg-slate-50/50 pb-12 pl-1! pr-2!">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        {/* Page Header */}
        <div className="border border-slate-800 bg-linear-to-r from-slate-900 via-slate-800 to-indigo-950 p-6! text-white shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white">
                Job Applications
              </h1>
              <p className="text-sm text-slate-300 mt-1">
                Track, organize, and manage your active job search in one place.
              </p>
            </div>

            <Button
              onClick={handleOpenCreateModal}
              className="inline-flex items-center gap-2 shadow-sm shrink-0 p-2! bg-white text-slate-900 hover:bg-slate-100 border-none"
            >
              <Plus className="h-4 w-4" />
              New Application
            </Button>
          </div>
        </div>

        {/* Filter Bar */}
        <ApplicationFilters filters={filters} onFiltersChange={setFilters} />

        {/* Content Section: Loading, Error, or Table */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center p-16 bg-white border border-slate-200 rounded-xl shadow-sm">
            <Loader2 className="h-8 w-8 text-blue-600 animate-spin mb-3" />
            <p className="text-sm text-slate-500 font-medium">
              Loading your applications...
            </p>
          </div>
        ) : isError ? (
          <div className="flex items-center gap-3 p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl">
            <AlertCircle className="h-5 w-5 shrink-0 text-rose-600" />
            <div>
              <h4 className="font-semibold text-sm">
                Failed to load applications
              </h4>
              <p className="text-xs text-rose-700 mt-0.5">
                {error?.response?.data?.message ||
                  error?.message ||
                  'An unexpected error occurred.'}
              </p>
            </div>
          </div>
        ) : (
          <ApplicationTable
            applications={applications}
            onEdit={handleOpenEditModal}
          />
        )}
      </div>

      {/* Create / Edit Dialog Modal */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto p-2!">
          <DialogHeader>
            <DialogTitle>
              {editingApplication ? 'Edit Application' : 'Add New Application'}
            </DialogTitle>
            <DialogDescription>
              {editingApplication
                ? 'Update the details of your application below.'
                : 'Fill in the details below to track a new job application.'}
            </DialogDescription>
          </DialogHeader>

          <ApplicationForm
            mode={editingApplication ? 'edit' : 'create'}
            application={editingApplication}
            onSuccess={handleCloseModal}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default DashboardPage;
