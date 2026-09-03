const { z } = require('zod');

const isValidObjectIdShape = (val) => {
  return typeof val === 'string' && /^[0-9a-fA-F]{24}$/.test(val);
};

const createInterviewSchema = z.object({
  applicationId: z
    .string()
    .refine(isValidObjectIdShape, { message: 'Invalid applicationId' }),
  scheduledAt: z.coerce.date(),
  type: z.enum(['Phone', 'Technical', 'Onsite', 'Final', 'Other']),
  interviewerName: z.string().optional(),
  notes: z.string().optional(),
});

const updateInterviewSchema = createInterviewSchema
  .omit({ applicationId: true })
  .partial()
  .extend({
    outcome: z.enum(['Pending', 'Passed', 'Failed']).optional(),
  });

module.exports = {
  createInterviewSchema,
  updateInterviewSchema,
};
