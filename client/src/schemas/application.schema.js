import { z } from 'zod';

// Helper to transform empty form strings ("") or null into undefined
const emptyToUndefined = (val) =>
  val === '' || val === null || val === undefined ? undefined : val;

export const applicationFormSchema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  jobTitle: z.string().min(1, 'Job title is required'),
  location: z.preprocess(emptyToUndefined, z.string().optional()),
  salary: z
    .object({
      min: z.preprocess(emptyToUndefined, z.coerce.number().optional()),
      max: z.preprocess(emptyToUndefined, z.coerce.number().optional()),
      currency: z.string().default('USD'),
    })
    .optional(),
  jobUrl: z.preprocess(
    emptyToUndefined,
    z.string().url('Must be a valid URL').optional()
  ),
  status: z.enum([
    'Wishlist',
    'Applied',
    'Screening',
    'Interview',
    'Offer',
    'Rejected',
  ]),
  applicationDate: z.preprocess(emptyToUndefined, z.coerce.date().optional()),
  recruiterName: z.preprocess(emptyToUndefined, z.string().optional()),
  recruiterEmail: z.preprocess(
    emptyToUndefined,
    z.string().email('Invalid email address').optional()
  ),
  notes: z.preprocess(emptyToUndefined, z.string().optional()),
});
