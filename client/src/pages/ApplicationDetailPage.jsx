import { useParams, Link } from 'react-router-dom';
import { useApplication } from '../hooks/useApplications';
import ApplicationForm from '../components/applications/ApplicationForm';
import InterviewList from '../components/interviews/InterviewList';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';

export default function ApplicationDetailPage() {
  const { id } = useParams();
  const { data: application, isLoading, isError, error } = useApplication(id);

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 max-w-4xl space-y-4">
        <p className="text-sm text-muted-foreground">
          Loading application details...
        </p>
      </div>
    );
  }

  if (isError || !application) {
    return (
      <div className="container mx-auto p-6 max-w-4xl space-y-4">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" asChild>
            <Link to="/dashboards">← Back to Applications</Link>
          </Button>
        </div>
        <Card className="border-destructive/50 bg-destructive/5">
          <CardHeader>
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
    <div className="container mx-auto p-6! max-w-full space-y-8">
      {/* Top Navigation */}
      <div className="flex items-center justify-between pb-2!">
        <Button variant="outline" size="sm" asChild className={'p-2!'}>
          <Link to="/dashboard">← Back to Applications</Link>
        </Button>
        <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
          Application Details
        </span>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Left Column: Edit Application Form */}
        <Card>
          <CardHeader className={'p-2!'}>
            <CardTitle>Edit Application</CardTitle>
            <CardDescription>
              Update company details, position info, or application status.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ApplicationForm
              mode="edit"
              application={application}
              onSuccess={() => {
                // Form stays on-page; changes reflect automatically via TanStack Query invalidation
              }}
            />
          </CardContent>
        </Card>

        {/* Right Column: Interviews & Milestone 12 Placeholders */}
        <div className="space-y-6">
          {/* Interview List Section */}
          <Card>
            <CardContent>
              <InterviewList applicationId={id} />
            </CardContent>
          </Card>

          {/* Honest Gap: Resume Section Placeholder */}
          <Card className="border-dashed bg-muted/20 p-2!">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Resume & Documents
              </CardTitle>
              <CardDescription className="text-xs">
                Resume attachment, document storage, and AI tailoring feature
                arrive in Milestone 12.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
}
