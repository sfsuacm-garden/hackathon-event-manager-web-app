import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  email_domain: z.boolean().optional(),
  country_code: z.boolean().optional(),
  created_at: z.boolean().optional()
}).strict();
export const schoolsSelectObjectSchema: z.ZodType<Prisma.schoolsSelect> = makeSchema() as unknown as z.ZodType<Prisma.schoolsSelect>;
export const schoolsSelectObjectZodSchema = makeSchema();
