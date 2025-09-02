import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { schoolsSelectObjectSchema } from './schoolsSelect.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  select: z.lazy(() => schoolsSelectObjectSchema).optional()
}).strict();
export const schoolsArgsObjectSchema = makeSchema();
export const schoolsArgsObjectZodSchema = makeSchema();
