import { useResumes, useDeleteResume } from '../../hooks/useResumes.js';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
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
import {
  FileText,
  ExternalLink,
  Trash2,
  Loader2,
  AlertCircle,
} from 'lucide-react';

export default function ResumeList() {
  const { data: resumes = [], isLoading, isError, error } = useResumes();
  const deleteMutation = useDeleteResume();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-8! border border-slate-200 rounded-xl bg-white shadow-xs">
        <Loader2 className="h-6 w-6 text-blue-600 animate-spin mb-2!" />
        <p className="text-xs font-medium text-slate-500">Loading resumes...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center gap-3! p-4! bg-rose-50 border border-rose-200 text-rose-800 rounded-xl">
        <AlertCircle className="h-5 w-5 shrink-0 text-rose-600" />
        <p className="text-xs font-medium">
          {error?.message || 'Failed to load resumes.'}
        </p>
      </div>
    );
  }

  if (!resumes || resumes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8! border border-dashed border-slate-300 rounded-xl bg-slate-50/50 space-y-2!">
        <FileText className="h-8 w-8 text-slate-400" />
        <h4 className="text-sm font-semibold text-slate-700">
          No resumes uploaded yet
        </h4>
        <p className="text-xs text-slate-500 max-w-xs">
          Upload a resume to attach it to your job applications or manage
          document versions.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3!">
      {resumes.map((resume) => {
        const formattedDate = resume.createdAt
          ? new Date(resume.createdAt).toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })
          : '';

        const resumeId = resume._id || resume.id;

        return (
          <Card
            key={resumeId}
            className="shadow-xs hover:border-slate-300 transition-colors"
          >
            <CardContent className="p-4! flex items-center justify-between gap-4!">
              {/* Left Side: Icon, Name, Version & Date */}
              <div className="flex items-center gap-3! min-w-0">
                <div className="p-3! bg-blue-50 text-blue-600 rounded-lg shrink-0">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="min-w-0 space-y-1!">
                  <div className="flex items-center gap-2! flex-wrap">
                    <p className="text-sm font-medium text-slate-900 truncate">
                      {resume.fileName}
                    </p>
                    {resume.version && (
                      <Badge
                        variant="secondary"
                        className="px-2.5! py-1! text-xs font-medium"
                      >
                        v{resume.version}
                      </Badge>
                    )}
                  </div>
                  {formattedDate && (
                    <p className="text-xs text-slate-500">
                      Uploaded {formattedDate}
                    </p>
                  )}
                </div>
              </div>

              {/* Right Side: View Link & Delete Modal */}
              <div className="flex items-center gap-2! shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="px-4! py-2! gap-2! text-xs font-medium"
                >
                  <a
                    href={resume.cloudinaryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    View
                  </a>
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger
                    render={
                      <Button
                        variant="ghost"
                        size="icon"
                        className="p-2.5! text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg shrink-0"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete Resume</span>
                      </Button>
                    }
                  />
                  <AlertDialogContent className="p-6!">
                    <AlertDialogHeader className="space-y-2!">
                      <AlertDialogTitle className="text-base font-semibold">
                        Delete Resume
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-xs leading-relaxed text-slate-600">
                        Are you sure you want to delete{' '}
                        <span className="font-semibold text-slate-900">
                          {resume.fileName}
                        </span>
                        ? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="gap-2! mt-4!">
                      <AlertDialogCancel className="px-4! py-2! text-xs">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-rose-600 hover:bg-rose-700 text-white px-4! py-2! text-xs font-medium"
                        onClick={() => deleteMutation.mutate(resumeId)}
                        disabled={deleteMutation.isPending}
                      >
                        {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
