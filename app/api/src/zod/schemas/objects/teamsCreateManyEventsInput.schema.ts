import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string().optional(),
  name: z.string().nullish(),
  created_at: z.date().nullish()
}).strict();
export const teamsCreateManyEventsInputObjectSchema: z.ZodType<Prisma.teamsCreateManyEventsInput> = makeSchema() as unknown as z.ZodType<Prisma.teamsCreateManyEventsInput>;
export const teamsCreateManyEventsInputObjectZodSchema = makeSchema();
