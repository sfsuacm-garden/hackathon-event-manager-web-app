import { z } from 'zod';

export const checkInLookupSchema = z.object({
  userId: z.string().min(1)
});

export const checkInSchema = z.object({
  userId: z.string().min(1)
});