import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { NullableBoolFieldUpdateOperationsInputObjectSchema } from './NullableBoolFieldUpdateOperationsInput.schema';
import { applicationsUncheckedUpdateManyWithoutEventsNestedInputObjectSchema } from './applicationsUncheckedUpdateManyWithoutEventsNestedInput.schema';
import { mailing_listsUncheckedUpdateManyWithoutEventsNestedInputObjectSchema } from './mailing_listsUncheckedUpdateManyWithoutEventsNestedInput.schema';
import { teamsUncheckedUpdateManyWithoutEventsNestedInputObjectSchema } from './teamsUncheckedUpdateManyWithoutEventsNestedInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  description: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).nullish(),
  start_date: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).nullish(),
  end_date: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).nullish(),
  created_at: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).nullish(),
  is_event_live: z.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputObjectSchema)]).nullish(),
  is_team_managment_open: z.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputObjectSchema)]).nullish(),
  applications: z.lazy(() => applicationsUncheckedUpdateManyWithoutEventsNestedInputObjectSchema).optional(),
  mailing_lists: z.lazy(() => mailing_listsUncheckedUpdateManyWithoutEventsNestedInputObjectSchema).optional(),
  teams: z.lazy(() => teamsUncheckedUpdateManyWithoutEventsNestedInputObjectSchema).optional()
}).strict();
export const eventsUncheckedUpdateInputObjectSchema: z.ZodType<Prisma.eventsUncheckedUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.eventsUncheckedUpdateInput>;
export const eventsUncheckedUpdateInputObjectZodSchema = makeSchema();
