const { z } = require('zod');

const uploadResumeSchema = z.object({
  title: z.string().trim().optional(),
});

module.exports = { uploadResumeSchema };
