import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { applicationsSelectObjectSchema } from './applicationsSelect.schema';
import { applicationsIncludeObjectSchema } from './applicationsInclude.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  select: z.lazy(() => applicationsSelectObjectSchema).optional(),
  include: z.lazy(() => applicationsIncludeObjectSchema).optional()
}).strict();
export const applicationsArgsObjectSchema = makeSchema();
export const applicationsArgsObjectZodSchema = makeSchema();
