import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { EventsCountOutputTypeSelectObjectSchema } from './EventsCountOutputTypeSelect.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  select: z.lazy(() => EventsCountOutputTypeSelectObjectSchema).optional()
}).strict();
export const EventsCountOutputTypeArgsObjectSchema = makeSchema();
export const EventsCountOutputTypeArgsObjectZodSchema = makeSchema();
