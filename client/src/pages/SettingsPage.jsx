import ResumeUploader from '../components/resumes/ResumeUploader.jsx';
import ResumeList from '../components/resumes/ResumeList';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { FileText, Settings } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="container mx-auto p-6! max-w-6xl space-y-8!">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4! pb-6! border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2! text-blue-600 mb-1!">
            <Settings className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase tracking-wider">
              Preferences & Documents
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Settings
          </h1>
          <p className="text-sm text-slate-500 mt-1!">
            Manage your resume versions and document storage settings.
          </p>
        </div>
      </div>

      {/* Main Grid: Upload & Resume Management */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8! items-start">
        {/* Left Column: Upload New Resume */}
        <Card className="lg:col-span-5 shadow-xs border-slate-200">
          <CardHeader className="p-6! pb-4!">
            <div className="flex items-center gap-2! text-slate-700 mb-1!">
              <FileText className="h-5 w-5 text-blue-600" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Upload New File
              </span>
            </div>
            <CardTitle className="text-lg font-semibold text-slate-900">
              Upload Resume
            </CardTitle>
            <CardDescription className="text-xs text-slate-500 leading-relaxed">
              Upload PDF resumes to associate with job applications. New uploads
              automatically increment your version history.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6! pt-0!">
            <ResumeUploader />
          </CardContent>
        </Card>

        {/* Right Column: Manage Resume History */}
        <Card className="lg:col-span-7 shadow-xs border-slate-200">
          <CardHeader className="p-6! pb-4!">
            <CardTitle className="text-lg font-semibold text-slate-900">
              Resume Versions
            </CardTitle>
            <CardDescription className="text-xs text-slate-500">
              View stored files, download documents, or remove old resume
              versions.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6! pt-0!">
            <ResumeList />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
