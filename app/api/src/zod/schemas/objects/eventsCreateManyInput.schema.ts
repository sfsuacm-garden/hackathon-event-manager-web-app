import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().nullish(),
  start_date: z.date().nullish(),
  end_date: z.date().nullish(),
  created_at: z.date().nullish(),
  is_event_live: z.boolean().nullish(),
  is_team_managment_open: z.boolean().nullish()
}).strict();
export const eventsCreateManyInputObjectSchema: z.ZodType<Prisma.eventsCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.eventsCreateManyInput>;
export const eventsCreateManyInputObjectZodSchema = makeSchema();
