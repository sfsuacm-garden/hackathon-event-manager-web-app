import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  applications: z.boolean().optional(),
  mailing_lists: z.boolean().optional(),
  teams: z.boolean().optional()
}).strict();
export const EventsCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.EventsCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.EventsCountOutputTypeSelect>;
export const EventsCountOutputTypeSelectObjectZodSchema = makeSchema();
