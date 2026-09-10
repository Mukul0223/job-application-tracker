import { useForm } from 'react-hook-form';
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
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      companyName: application?.companyName || '',
      jobTitle: application?.jobTitle || '',
      status: application?.status || 'Wishlist',
      location: application?.location || '',
      jobUrl: application?.jobUrl || '',
      minSalary: application?.minSalary || '',
      maxSalary: application?.maxSalary || '',
      currency: application?.currency || 'USD',
      recruiterName: application?.recruiterName || '',
      recruiterEmail: application?.recruiterEmail || '',
      notes: application?.notes || '',
    },
  });

  const onSubmit = (data) => {
    console.log('Form Submitted:', data);
    if (onSuccess) onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Company Name */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">
            Company Name *
          </label>
          <Input
            placeholder="e.g. Google"
            {...register('companyName', { required: true })}
          />
          {errors.companyName && (
            <p className="text-xs text-rose-500">Required</p>
          )}
        </div>

        {/* Job Title */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">
            Job Title *
          </label>
          <Input
            placeholder="e.g. Frontend Engineer"
            {...register('jobTitle', { required: true })}
          />
          {errors.jobTitle && <p className="text-xs text-rose-500">Required</p>}
        </div>

        {/* Status */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">
            Status *
          </label>
          <Select
            defaultValue={watch('status')}
            onValueChange={(val) => setValue('status', val)}
          >
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
              {...register('minSalary')}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">
              Max Salary
            </label>
            <Input
              type="number"
              placeholder="120000"
              {...register('maxSalary')}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">
              Currency
            </label>
            <Input placeholder="USD" {...register('currency')} />
          </div>
        </div>

        {/* Recruiter Details */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">
            Recruiter Name
          </label>
          <Input placeholder="Jane Doe" {...register('recruiterName')} />
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
        </div>

        {/* Notes */}
        <div className="md:col-span-2 space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">Notes</label>
          <Textarea
            placeholder="Key requirements, referral details..."
            className="resize-none h-20"
            {...register('notes')}
          />
        </div>
      </div>

      {/* Form Actions Footer */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
        <Button type="button" variant="outline" onClick={onSuccess}>
          Cancel
        </Button>
        <Button type="submit">
          {mode === 'edit' ? 'Save Changes' : 'Create Application'}
        </Button>
      </div>
    </form>
  );
}
