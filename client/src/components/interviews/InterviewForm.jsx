import { useState } from 'react';
import {
  useCreateInterview,
  useUpdateInterview,
} from '../../hooks/useInterviews.js';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const INTERVIEW_TYPES = ['Phone', 'Technical', 'Onsite', 'Final ', 'Other'];

const OUTCOME_OPTIONS = ['Pending', 'Passed', 'Failed'];

const formatDateForInput = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toISOString().slice(0, 16);
};

const getInitialFormData = (interview) => ({
  type: interview?.type || INTERVIEW_TYPES[0],
  scheduledAt: formatDateForInput(interview?.scheduledAt),
  interviewerName: interview?.interviewerName || '',
  notes: interview?.notes || '',
  outcome: interview?.outcome || 'Pending',
});

export default function InterviewForm({
  applicationId,
  mode = 'create',
  interview = null,
  onSuccess,
}) {
  const createInterview = useCreateInterview();
  const updateInterview = useUpdateInterview();

  const [formData, setFormData] = useState(() => getInitialFormData(interview));
  const [prevInterview, setPrevInterview] = useState(interview);

  if (interview !== prevInterview) {
    setPrevInterview(interview);
    setFormData(getInitialFormData(interview));
  }

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isEdit = mode === 'edit' && interview?.id;
    const mutation = isEdit ? updateInterview : createInterview;

    const payload = isEdit
      ? { id: interview.id, ...formData }
      : { applicationId, ...formData };

    mutation.mutate(payload, {
      onSuccess: () => {
        if (onSuccess) onSuccess();
      },
    });
  };

  const isLoading = createInterview.isPending || updateInterview.isPending;

  return (
    <form onSubmit={handleSubmit} className="space-y-5! pt-3">
      <div className="grid gap-2 ">
        <Label htmlFor="type">Interview Type</Label>
        <Select
          value={formData.type}
          onValueChange={(val) => handleChange('type', val)}
        >
          <SelectTrigger id="type">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            {INTERVIEW_TYPES.map((typeOption) => (
              <SelectItem key={typeOption} value={typeOption}>
                {typeOption}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="scheduledAt">Date & Time</Label>
        <Input
          type="datetime-local"
          id="scheduledAt"
          name="scheduledAt"
          value={formData.scheduledAt}
          onChange={(e) => handleChange('scheduledAt', e.target.value)}
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="interviewerName">Interviewer Name</Label>
        <Input
          type="text"
          id="interviewerName"
          name="interviewerName"
          value={formData.interviewerName}
          onChange={(e) => handleChange('interviewerName', e.target.value)}
          placeholder="e.g. Jane Doe"
        />
      </div>

      {mode === 'edit' && (
        <div className="grid gap-2">
          <Label htmlFor="outcome">Outcome</Label>
          <Select
            value={formData.outcome}
            onValueChange={(val) => handleChange('outcome', val)}
          >
            <SelectTrigger id="outcome">
              <SelectValue placeholder="Select outcome" />
            </SelectTrigger>
            <SelectContent>
              {OUTCOME_OPTIONS.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="grid gap-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          name="notes"
          rows={4}
          value={formData.notes}
          onChange={(e) => handleChange('notes', e.target.value)}
          placeholder="Topics discussed, questions asked, prep notes..."
        />
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading
          ? 'Saving...'
          : mode === 'edit'
            ? 'Update Interview'
            : 'Schedule Interview'}
      </Button>
    </form>
  );
}
