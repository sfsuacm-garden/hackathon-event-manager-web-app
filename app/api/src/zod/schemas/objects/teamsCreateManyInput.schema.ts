import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string().optional(),
  event_id: z.string().nullish(),
  name: z.string().nullish(),
  created_at: z.date().nullish()
}).strict();
export const teamsCreateManyInputObjectSchema: z.ZodType<Prisma.teamsCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.teamsCreateManyInput>;
export const teamsCreateManyInputObjectZodSchema = makeSchema();
