import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { applicationFormSchema } from '../../schemas/application.schema.js';
import {
  useCreateApplication,
  useUpdateApplication,
} from '../../hooks/useApplications.js';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export default function ApplicationForm({
  mode = 'create',
  application = null,
  onSuccess,
}) {
  const createMutation = useCreateApplication();
  const updateMutation = useUpdateApplication();

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(applicationFormSchema),
    defaultValues: {
      companyName: application?.companyName || '',
      jobTitle: application?.jobTitle || '',
      status: application?.status || 'Wishlist',
      location: application?.location || '',
      applicationDate: application?.applicationDate
        ? new Date(application.applicationDate).toISOString().split('T')[0]
        : '',
      jobUrl: application?.jobUrl || '',
      salary: {
        min: application?.salary?.min ?? '',
        max: application?.salary?.max ?? '',
        currency: application?.salary?.currency || 'USD',
      },
      recruiterName: application?.recruiterName || '',
      recruiterEmail: application?.recruiterEmail || '',
      notes: application?.notes || '',
    },
  });

  const onSubmit = (data) => {
    if (mode === 'edit' && (application?._id || application?.id)) {
      const id = application._id || application.id;
      updateMutation.mutate(
        { id, data },
        {
          onSuccess: () => {
            if (onSuccess) onSuccess();
          },
        }
      );
    } else {
      createMutation.mutate(data, {
        onSuccess: () => {
          if (onSuccess) onSuccess();
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Company Name */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">
            Company Name *
          </label>
          <Input placeholder="e.g. Google" {...register('companyName')} />
          {errors.companyName && (
            <p className="text-xs text-rose-500">
              {errors.companyName.message}
            </p>
          )}
        </div>

        {/* Job Title */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">
            Job Title *
          </label>
          <Input
            placeholder="e.g. Frontend Engineer"
            {...register('jobTitle')}
          />
          {errors.jobTitle && (
            <p className="text-xs text-rose-500">{errors.jobTitle.message}</p>
          )}
        </div>

        {/* Status */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">
            Status *
          </label>
          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  {[
                    'Wishlist',
                    'Applied',
                    'Screening',
                    'Interview',
                    'Offer',
                    'Rejected',
                  ].map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.status && (
            <p className="text-xs text-rose-500">{errors.status.message}</p>
          )}
        </div>

        {/* Location */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">
            Location
          </label>
          <Input
            placeholder="e.g. Remote / New York"
            {...register('location')}
          />
          {errors.location && (
            <p className="text-xs text-rose-500">{errors.location.message}</p>
          )}
        </div>

        {/* Application Date */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">
            Application Date
          </label>
          <Input type="date" {...register('applicationDate')} />
          {errors.applicationDate && (
            <p className="text-xs text-rose-500">
              {errors.applicationDate.message}
            </p>
          )}
        </div>

        {/* Job Posting URL */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">
            Job Posting URL
          </label>
          <Input type="url" placeholder="https://..." {...register('jobUrl')} />
          {errors.jobUrl && (
            <p className="text-xs text-rose-500">{errors.jobUrl.message}</p>
          )}
        </div>

        {/* Salary Row */}
        <div className="md:col-span-2 grid grid-cols-3 gap-3">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">
              Min Salary
            </label>
            <Input
              type="number"
              placeholder="80000"
              {...register('salary.min')}
            />
            {errors.salary?.min && (
              <p className="text-xs text-rose-500">
                {errors.salary.min.message}
              </p>
            )}
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">
              Max Salary
            </label>
            <Input
              type="number"
              placeholder="120000"
              {...register('salary.max')}
            />
            {errors.salary?.max && (
              <p className="text-xs text-rose-500">
                {errors.salary.max.message}
              </p>
            )}
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">
              Currency
            </label>
            <Input placeholder="USD" {...register('salary.currency')} />
            {errors.salary?.currency && (
              <p className="text-xs text-rose-500">
                {errors.salary.currency.message}
              </p>
            )}
          </div>
        </div>

        {/* Recruiter Details */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">
            Recruiter Name
          </label>
          <Input placeholder="Jane Doe" {...register('recruiterName')} />
          {errors.recruiterName && (
            <p className="text-xs text-rose-500">
              {errors.recruiterName.message}
            </p>
          )}
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">
            Recruiter Email
          </label>
          <Input
            type="email"
            placeholder="jane@company.com"
            {...register('recruiterEmail')}
          />
          {errors.recruiterEmail && (
            <p className="text-xs text-rose-500">
              {errors.recruiterEmail.message}
            </p>
          )}
        </div>

        {/* Notes */}
        <div className="md:col-span-2 space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">Notes</label>
          <Textarea
            placeholder="Key requirements, referral details..."
            className="resize-none h-20"
            {...register('notes')}
          />
          {errors.notes && (
            <p className="text-xs text-rose-500">{errors.notes.message}</p>
          )}
        </div>
      </div>

      {/* Form Actions Footer */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
        <Button
          type="button"
          variant="outline"
          onClick={onSuccess}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? 'Saving...'
            : mode === 'edit'
              ? 'Save Changes'
              : 'Create Application'}
        </Button>
      </div>
    </form>
  );
}
