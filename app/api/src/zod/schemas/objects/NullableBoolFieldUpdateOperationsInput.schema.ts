import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  set: z.boolean().nullish()
}).strict();
export const NullableBoolFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.NullableBoolFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.NullableBoolFieldUpdateOperationsInput>;
export const NullableBoolFieldUpdateOperationsInputObjectZodSchema = makeSchema();
