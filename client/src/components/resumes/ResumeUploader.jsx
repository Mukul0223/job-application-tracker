import { useState, useRef, useEffect } from 'react';
import { useUploadResume } from '../../hooks/useResumes.js';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Upload,
  FileText,
  AlertCircle,
  CheckCircle2,
  Loader2,
} from 'lucide-react';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes
const ALLOWED_EXTENSIONS = ['.pdf', '.docx'];

export default function ResumeUploader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const fileInputRef = useRef(null);

  // Automatically clear the success message after 4 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 4000);

      return () => clearTimeout(timer); // Clean up timeout on unmount or reset
    }
  }, [successMessage]);

  const uploadMutation = useUploadResume();

  const validateFile = (file) => {
    if (!file) return 'Please select a file to upload.';

    const fileName = file.name.toLowerCase();
    const hasValidExtension = ALLOWED_EXTENSIONS.some((ext) =>
      fileName.endsWith(ext)
    );

    if (!hasValidExtension) {
      return 'Invalid file type. Only .pdf and .docx files are allowed.';
    }

    if (file.size > MAX_FILE_SIZE) {
      return 'File size exceeds the 5MB limit. Please upload a smaller file.';
    }

    return null;
  };

  const handleFileChange = (e) => {
    setError(null);
    setSuccessMessage(null);
    const file = e.target.files?.[0];

    if (file) {
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        setSelectedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    const validationError = validateFile(selectedFile);
    if (validationError) {
      setError(validationError);
      return;
    }

    uploadMutation.mutate(selectedFile, {
      onSuccess: () => {
        setSuccessMessage('Resume uploaded successfully!');
        setSelectedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
      },
      onError: (err) => {
        setError(
          err?.response?.data?.message ||
            err?.message ||
            'Failed to upload resume. Please try again.'
        );
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5! p-2!">
      {/* File Input Selection */}
      <div className="space-y-2!">
        <Label
          htmlFor="resume-file"
          className="text-sm font-medium text-slate-700"
        >
          Select Resume File
        </Label>

        <label
          htmlFor="resume-file"
          className="flex! items-center! gap-3! w-full! h-11! px-3! bg-white border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50/80 transition-colors"
        >
          <span className="inline-flex! items-center! justify-center! px-3! py-1.5! bg-blue-50 text-blue-700 text-xs font-semibold rounded-md shrink-0">
            Browse...
          </span>
          <span className="text-xs text-slate-500 truncate select-none">
            {selectedFile ? selectedFile.name : 'No file selected.'}
          </span>
          <input
            id="resume-file"
            type="file"
            ref={fileInputRef}
            accept=".pdf,.docx"
            onChange={handleFileChange}
            disabled={uploadMutation.isPending}
            className="sr-only!"
          />
        </label>

        <p className="text-xs text-slate-500">
          Supported formats:{' '}
          <span className="font-medium text-slate-700">PDF, DOCX</span> (Max
          5MB)
        </p>
      </div>

      {/* Selected File Details */}
      {selectedFile && !error && (
        <div className="flex items-center gap-3! p-3.5! bg-slate-50 border border-slate-200 rounded-lg">
          <FileText className="h-5 w-5 text-blue-600 shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-slate-800 truncate">
              {selectedFile.name}
            </p>
            <p className="text-[11px] text-slate-500">
              {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
            </p>
          </div>
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <div className="flex items-center gap-3! p-3.5! bg-rose-50 border border-rose-200 text-rose-800 rounded-lg">
          <AlertCircle className="h-4 w-4 text-rose-600 shrink-0" />
          <p className="text-xs font-medium">{error}</p>
        </div>
      )}

      {/* Success Alert */}
      {successMessage && (
        <div className="flex items-center gap-3! p-3.5! bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg">
          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
          <p className="text-xs font-medium">{successMessage}</p>
        </div>
      )}

      {/* Upload Action Button */}
      <Button
        type="submit"
        disabled={!selectedFile || uploadMutation.isPending}
        className="w-full! px-5! py-2.5! gap-2! text-xs font-semibold shadow-xs"
      >
        {uploadMutation.isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Uploading...
          </>
        ) : (
          <>
            <Upload className="h-4 w-4" />
            Upload Resume
          </>
        )}
      </Button>
    </form>
  );
}
