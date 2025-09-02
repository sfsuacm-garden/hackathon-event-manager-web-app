import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string().optional(),
  name: z.string(),
  email_domain: z.string(),
  country_code: z.string(),
  created_at: z.date().optional()
}).strict();
export const schoolsUncheckedCreateInputObjectSchema: z.ZodType<Prisma.schoolsUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.schoolsUncheckedCreateInput>;
export const schoolsUncheckedCreateInputObjectZodSchema = makeSchema();
