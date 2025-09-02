import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { application_statusSchema } from '../enums/application_status.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  set: application_statusSchema.nullish()
}).strict();
export const NullableEnumapplication_statusFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.NullableEnumapplication_statusFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.NullableEnumapplication_statusFieldUpdateOperationsInput>;
export const NullableEnumapplication_statusFieldUpdateOperationsInputObjectZodSchema = makeSchema();
