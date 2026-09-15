import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApplication, useDeleteApplication } from '../hooks/useApplications';
import ApplicationForm from '../components/applications/ApplicationForm';
import InterviewList from '../components/interviews/InterviewList';
import ResumeList from '../components/resumes/ResumeList';
import { Button, buttonVariants } from '@/components/ui/button';
import { Trash2, FileText } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export default function ApplicationDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: application, isLoading, isError, error } = useApplication(id);
  const deleteMutation = useDeleteApplication();

  if (isLoading) {
    return (
      <div className="container mx-auto p-6! max-w-4xl space-y-4!">
        <p className="text-sm text-muted-foreground">
          Loading application details...
        </p>
      </div>
    );
  }

  if (isError || !application) {
    return (
      <div className="container mx-auto p-6! max-w-4xl space-y-4!">
        <div className="flex items-center space-x-2">
          <Link
            to="/dashboard"
            className={buttonVariants({ variant: 'outline', size: 'sm' })}
          >
            ← Back to Applications
          </Link>
        </div>
        <Card className="border-destructive/50 bg-destructive/5">
          <CardHeader className="p-6!">
            <CardTitle className="text-destructive">
              Application Not Found
            </CardTitle>
            <CardDescription>
              {error?.message ||
                "The application you're looking for does not exist or failed to load."}
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6! max-w-full space-y-8!">
      {/* Top Navigation */}
      <div className="flex items-center justify-between pb-2!">
        <Link
          to="/dashboard"
          className={`${buttonVariants({ variant: 'outline', size: 'sm' })}`}
        >
          ← Back to Applications
        </Link>
        <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
          Application Details
        </span>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6! items-start">
        {/* Left Column: Edit Application Form */}
        <Card>
          <CardHeader className="p-6! pb-2! flex flex-row items-start justify-between space-y-0">
            <div>
              <CardTitle>Edit Application</CardTitle>
              <CardDescription className="mt-1!">
                Update company details, position info, or application status.
              </CardDescription>
            </div>

            <AlertDialog>
              <AlertDialogTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive hover:bg-destructive/10 shrink-0 p-2!"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete Application</span>
                  </Button>
                }
              />
              <AlertDialogContent className="p-6!">
                <AlertDialogHeader className="space-y-2!">
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription className="text-xs leading-relaxed text-slate-600">
                    This action cannot be undone. This will permanently delete
                    your application for{' '}
                    <span className="font-semibold text-slate-900">
                      {application.companyName}
                    </span>{' '}
                    and remove all associated data.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="gap-2! mt-4!">
                  <AlertDialogCancel className="px-4! py-2! text-xs">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-rose-600 hover:bg-rose-700 text-white px-4! py-2! text-xs font-medium"
                    onClick={() =>
                      deleteMutation.mutate(application._id, {
                        onSuccess: () => navigate('/dashboard'),
                      })
                    }
                    disabled={deleteMutation.isPending}
                  >
                    {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardHeader>
          <CardContent className="p-6! pt-0!">
            <ApplicationForm
              mode="edit"
              application={application}
              onSuccess={() => {
                // Form stays on-page; changes reflect automatically via TanStack Query invalidation
              }}
            />
          </CardContent>
        </Card>

        {/* Right Column: Interviews & Resumes */}
        <div className="space-y-6!">
          {/* Interview List Section */}
          <Card>
            <CardContent className="p-4!">
              <InterviewList applicationId={id} />
            </CardContent>
          </Card>

          {/* Resumes & Documents Section */}
          <Card>
            <CardHeader className="p-6! pb-4!">
              <div className="flex items-center gap-2! text-slate-700 mb-1!">
                <FileText className="h-5 w-5 text-blue-600" />
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Documents
                </span>
              </div>
              <CardTitle className="text-lg font-semibold text-slate-900">
                Resumes
              </CardTitle>
              <CardDescription className="text-xs text-slate-500">
                Manage and view your uploaded resume versions.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6! pt-0!">
              <ResumeList />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
