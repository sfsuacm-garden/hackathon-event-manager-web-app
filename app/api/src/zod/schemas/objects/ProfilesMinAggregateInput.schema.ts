import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.literal(true).optional(),
  email: z.literal(true).optional(),
  full_name: z.literal(true).optional(),
  role: z.literal(true).optional(),
  created_at: z.literal(true).optional()
}).strict();
export const ProfilesMinAggregateInputObjectSchema: z.ZodType<Prisma.ProfilesMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ProfilesMinAggregateInputType>;
export const ProfilesMinAggregateInputObjectZodSchema = makeSchema();
