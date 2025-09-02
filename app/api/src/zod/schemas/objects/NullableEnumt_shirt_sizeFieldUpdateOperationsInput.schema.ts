import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { t_shirt_sizeSchema } from '../enums/t_shirt_size.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  set: t_shirt_sizeSchema.nullish()
}).strict();
export const NullableEnumt_shirt_sizeFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.NullableEnumt_shirt_sizeFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.NullableEnumt_shirt_sizeFieldUpdateOperationsInput>;
export const NullableEnumt_shirt_sizeFieldUpdateOperationsInputObjectZodSchema = makeSchema();
