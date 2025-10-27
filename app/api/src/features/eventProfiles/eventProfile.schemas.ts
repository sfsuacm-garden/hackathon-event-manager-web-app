import z from 'zod';

export const meEventProfileSchema = z.object({
  includeUserProfile: z.boolean().optional()
});
