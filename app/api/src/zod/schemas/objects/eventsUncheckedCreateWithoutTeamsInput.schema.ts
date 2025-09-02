import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { applicationsUncheckedCreateNestedManyWithoutEventsInputObjectSchema } from './applicationsUncheckedCreateNestedManyWithoutEventsInput.schema';
import { mailing_listsUncheckedCreateNestedManyWithoutEventsInputObjectSchema } from './mailing_listsUncheckedCreateNestedManyWithoutEventsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().nullish(),
  start_date: z.date().nullish(),
  end_date: z.date().nullish(),
  created_at: z.date().nullish(),
  is_event_live: z.boolean().nullish(),
  is_team_managment_open: z.boolean().nullish(),
  applications: z.lazy(() => applicationsUncheckedCreateNestedManyWithoutEventsInputObjectSchema).optional(),
  mailing_lists: z.lazy(() => mailing_listsUncheckedCreateNestedManyWithoutEventsInputObjectSchema).optional()
}).strict();
export const eventsUncheckedCreateWithoutTeamsInputObjectSchema: z.ZodType<Prisma.eventsUncheckedCreateWithoutTeamsInput> = makeSchema() as unknown as z.ZodType<Prisma.eventsUncheckedCreateWithoutTeamsInput>;
export const eventsUncheckedCreateWithoutTeamsInputObjectZodSchema = makeSchema();
