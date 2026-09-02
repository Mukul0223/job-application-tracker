const { z } = require('zod');

// 24-character hexadecimal regex for Mongo ObjectIds
const objectIdRegex = /^[0-9a-fA-F]{24}$/;

const createApplicationSchema = z.object({
  companyName: z.string().min(1),
  jobTitle: z.string().min(1),
  location: z.string().optional(),
  salary: z
    .object({
      min: z.number().optional(),
      max: z.number().optional(),
      currency: z.string().optional(),
    })
    .optional(),
  jobUrl: z.string().url().optional(),
  status: z
    .enum([
      'Wishlist',
      'Applied',
      'Screening',
      'Interview',
      'Offer',
      'Rejected',
    ])
    .optional(),
  applicationDate: z.coerce.date().optional(),
  recruiterName: z.string().optional(),
  recruiterEmail: z.string().email().optional(),
  notes: z.string().optional(),
  resumeId: z
    .string()
    .regex(objectIdRegex, { message: 'Invalid ObjectId format' })
    .optional(),
});

const updateApplicationSchema = createApplicationSchema.partial();

const updateStatusSchema = z.object({
  status: z.enum([
    'Wishlist',
    'Applied',
    'Screening',
    'Interview',
    'Offer',
    'Rejected',
  ]),
});

module.exports = {
  createApplicationSchema,
  updateApplicationSchema,
  updateStatusSchema,
};
