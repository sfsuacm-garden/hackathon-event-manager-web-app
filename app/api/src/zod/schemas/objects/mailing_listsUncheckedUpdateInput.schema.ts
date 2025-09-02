import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { mailing_list_membersUncheckedUpdateManyWithoutMailing_listsNestedInputObjectSchema } from './mailing_list_membersUncheckedUpdateManyWithoutMailing_listsNestedInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  event_id: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).nullish(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  created_at: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).nullish(),
  mailing_list_members: z.lazy(() => mailing_list_membersUncheckedUpdateManyWithoutMailing_listsNestedInputObjectSchema).optional()
}).strict();
export const mailing_listsUncheckedUpdateInputObjectSchema: z.ZodType<Prisma.mailing_listsUncheckedUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.mailing_listsUncheckedUpdateInput>;
export const mailing_listsUncheckedUpdateInputObjectZodSchema = makeSchema();
