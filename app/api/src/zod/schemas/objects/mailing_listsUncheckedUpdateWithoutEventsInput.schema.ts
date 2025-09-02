import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { mailing_list_membersUncheckedUpdateManyWithoutMailing_listsNestedInputObjectSchema } from './mailing_list_membersUncheckedUpdateManyWithoutMailing_listsNestedInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  created_at: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).nullish(),
  mailing_list_members: z.lazy(() => mailing_list_membersUncheckedUpdateManyWithoutMailing_listsNestedInputObjectSchema).optional()
}).strict();
export const mailing_listsUncheckedUpdateWithoutEventsInputObjectSchema: z.ZodType<Prisma.mailing_listsUncheckedUpdateWithoutEventsInput> = makeSchema() as unknown as z.ZodType<Prisma.mailing_listsUncheckedUpdateWithoutEventsInput>;
export const mailing_listsUncheckedUpdateWithoutEventsInputObjectZodSchema = makeSchema();
