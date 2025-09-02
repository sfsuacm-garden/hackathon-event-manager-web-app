import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { applicationsCreateNestedManyWithoutEventsInputObjectSchema } from './applicationsCreateNestedManyWithoutEventsInput.schema';
import { teamsCreateNestedManyWithoutEventsInputObjectSchema } from './teamsCreateNestedManyWithoutEventsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().nullish(),
  start_date: z.date().nullish(),
  end_date: z.date().nullish(),
  created_at: z.date().nullish(),
  is_event_live: z.boolean().nullish(),
  is_team_managment_open: z.boolean().nullish(),
  applications: z.lazy(() => applicationsCreateNestedManyWithoutEventsInputObjectSchema).optional(),
  teams: z.lazy(() => teamsCreateNestedManyWithoutEventsInputObjectSchema).optional()
}).strict();
export const eventsCreateWithoutMailing_listsInputObjectSchema: z.ZodType<Prisma.eventsCreateWithoutMailing_listsInput> = makeSchema() as unknown as z.ZodType<Prisma.eventsCreateWithoutMailing_listsInput>;
export const eventsCreateWithoutMailing_listsInputObjectZodSchema = makeSchema();
