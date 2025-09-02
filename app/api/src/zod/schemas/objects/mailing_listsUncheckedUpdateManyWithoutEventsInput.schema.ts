import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  created_at: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).nullish()
}).strict();
export const mailing_listsUncheckedUpdateManyWithoutEventsInputObjectSchema: z.ZodType<Prisma.mailing_listsUncheckedUpdateManyWithoutEventsInput> = makeSchema() as unknown as z.ZodType<Prisma.mailing_listsUncheckedUpdateManyWithoutEventsInput>;
export const mailing_listsUncheckedUpdateManyWithoutEventsInputObjectZodSchema = makeSchema();
