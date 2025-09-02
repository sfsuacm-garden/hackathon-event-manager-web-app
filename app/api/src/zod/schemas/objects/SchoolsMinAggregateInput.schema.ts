import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.literal(true).optional(),
  name: z.literal(true).optional(),
  email_domain: z.literal(true).optional(),
  country_code: z.literal(true).optional(),
  created_at: z.literal(true).optional()
}).strict();
export const SchoolsMinAggregateInputObjectSchema: z.ZodType<Prisma.SchoolsMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.SchoolsMinAggregateInputType>;
export const SchoolsMinAggregateInputObjectZodSchema = makeSchema();
