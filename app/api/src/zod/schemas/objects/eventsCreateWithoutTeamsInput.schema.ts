import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { applicationsCreateNestedManyWithoutEventsInputObjectSchema } from './applicationsCreateNestedManyWithoutEventsInput.schema';
import { mailing_listsCreateNestedManyWithoutEventsInputObjectSchema } from './mailing_listsCreateNestedManyWithoutEventsInput.schema'

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
  mailing_lists: z.lazy(() => mailing_listsCreateNestedManyWithoutEventsInputObjectSchema).optional()
}).strict();
export const eventsCreateWithoutTeamsInputObjectSchema: z.ZodType<Prisma.eventsCreateWithoutTeamsInput> = makeSchema() as unknown as z.ZodType<Prisma.eventsCreateWithoutTeamsInput>;
export const eventsCreateWithoutTeamsInputObjectZodSchema = makeSchema();
