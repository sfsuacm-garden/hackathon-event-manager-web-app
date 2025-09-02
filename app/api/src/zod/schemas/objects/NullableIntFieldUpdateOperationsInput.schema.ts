import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  set: z.number().int().nullish(),
  increment: z.number().int().optional(),
  decrement: z.number().int().optional(),
  multiply: z.number().int().optional(),
  divide: z.number().int().optional()
}).strict();
export const NullableIntFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput>;
export const NullableIntFieldUpdateOperationsInputObjectZodSchema = makeSchema();
