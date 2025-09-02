import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string().optional(),
  email: z.string(),
  full_name: z.string(),
  role: z.string(),
  created_at: z.date().nullish()
}).strict();
export const profilesCreateManyInputObjectSchema: z.ZodType<Prisma.profilesCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.profilesCreateManyInput>;
export const profilesCreateManyInputObjectZodSchema = makeSchema();
