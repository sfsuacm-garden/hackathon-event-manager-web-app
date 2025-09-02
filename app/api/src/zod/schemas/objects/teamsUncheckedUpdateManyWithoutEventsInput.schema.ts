import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).nullish(),
  created_at: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).nullish()
}).strict();
export const teamsUncheckedUpdateManyWithoutEventsInputObjectSchema: z.ZodType<Prisma.teamsUncheckedUpdateManyWithoutEventsInput> = makeSchema() as unknown as z.ZodType<Prisma.teamsUncheckedUpdateManyWithoutEventsInput>;
export const teamsUncheckedUpdateManyWithoutEventsInputObjectZodSchema = makeSchema();
