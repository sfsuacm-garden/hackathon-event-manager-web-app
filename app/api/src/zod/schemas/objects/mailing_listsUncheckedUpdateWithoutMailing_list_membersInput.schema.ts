import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  event_id: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).nullish(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  created_at: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).nullish()
}).strict();
export const mailing_listsUncheckedUpdateWithoutMailing_list_membersInputObjectSchema: z.ZodType<Prisma.mailing_listsUncheckedUpdateWithoutMailing_list_membersInput> = makeSchema() as unknown as z.ZodType<Prisma.mailing_listsUncheckedUpdateWithoutMailing_list_membersInput>;
export const mailing_listsUncheckedUpdateWithoutMailing_list_membersInputObjectZodSchema = makeSchema();
