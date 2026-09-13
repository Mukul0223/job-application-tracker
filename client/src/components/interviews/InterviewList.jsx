import { useState } from 'react';
import {
  useInterviews,
  useDeleteInterview,
} from '../../hooks/useInterviews.js';
import InterviewForm from './InterviewForm';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

/**
 * Renders badge variant based on interview outcome status.
 */
const getOutcomeBadgeVariant = (outcome) => {
  switch (outcome) {
    case 'Passed':
      return 'default'; // standard dark/primary badge
    case 'Failed':
      return 'destructive';
    case 'Cancelled':
      return 'secondary';
    case 'Pending':
    default:
      return 'outline';
  }
};

/**
 * Format ISO datetime string for human-readable display.
 */
const formatDateTime = (dateString) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
};

/**
 * Self-contained component that fetches and manages interviews for a given application ID.
 *
 * Props:
 * - applicationId: string | number (required)
 */
export default function InterviewList({ applicationId }) {
  const {
    data: interviews = [],
    isLoading,
    isError,
  } = useInterviews(applicationId);
  const deleteInterview = useDeleteInterview();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingInterview, setEditingInterview] = useState(null);

  const handleDelete = (id) => {
    if (
      window.confirm('Are you sure you want to delete this interview entry?')
    ) {
      deleteInterview.mutate(id);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header & Create Trigger */}
      <div className="flex items-center justify-between p-2!">
        <h3 className="text-lg font-semibold tracking-tight">Interviews</h3>

        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger
            render={
              <Button size="sm" className={'p-2!'}>
                Add Interview
              </Button>
            }
          />
          <DialogContent className="sm:max-w-106.25 p-2!">
            <DialogHeader>
              <DialogTitle>Schedule Interview</DialogTitle>
            </DialogHeader>
            <InterviewForm
              applicationId={applicationId}
              mode="create"
              onSuccess={() => setIsCreateOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Loading & Error States */}
      {isLoading && (
        <p className="text-sm text-muted-foreground">Loading interviews...</p>
      )}

      {isError && (
        <p className="text-sm text-destructive">
          Failed to load interviews. Please try again.
        </p>
      )}

      {/* Empty State */}
      {!isLoading && !isError && interviews.length === 0 && (
        <Card className="border-dashed p-6 text-center">
          <p className="text-sm text-muted-foreground">
            No interviews logged yet.
          </p>
        </Card>
      )}

      {/* Interview List */}
      {!isLoading && !isError && interviews.length > 0 && (
        <div className="space-y-3!">
          {interviews.map((interview) => (
            <Card key={interview._id} className="relative p-2!">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-base font-medium">
                      {interview.type}
                    </CardTitle>
                    <CardDescription>
                      {formatDateTime(interview.scheduledAt)}
                    </CardDescription>
                  </div>
                  <Badge
                    variant={getOutcomeBadgeVariant(interview.outcome)}
                    className={'p-2!'}
                  >
                    {interview.outcome}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-2">
                {interview.interviewerName && (
                  <p className="text-sm">
                    <span className="font-medium text-muted-foreground">
                      Interviewer:
                    </span>{' '}
                    {interview.interviewerName}
                  </p>
                )}

                {interview.notes && (
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap bg-muted/40 p-2 rounded-md">
                    {interview.notes}
                  </p>
                )}

                {/* Actions */}
                <div className="flex justify-end space-x-2! pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingInterview(interview)}
                    className={'p-2!'}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(interview._id)}
                    disabled={deleteInterview.isPending}
                    className={'p-2!'}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog
        open={Boolean(editingInterview)}
        onOpenChange={(open) => !open && setEditingInterview(null)}
      >
        <DialogContent className="sm:max-w-106.25 p-2!">
          <DialogHeader>
            <DialogTitle>Edit Interview</DialogTitle>
          </DialogHeader>
          {editingInterview && (
            <InterviewForm
              applicationId={applicationId}
              mode="edit"
              interview={editingInterview}
              onSuccess={() => setEditingInterview(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
