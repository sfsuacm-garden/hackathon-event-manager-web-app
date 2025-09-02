import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  set: z.string().nullish()
}).strict();
export const NullableStringFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput>;
export const NullableStringFieldUpdateOperationsInputObjectZodSchema = makeSchema();
