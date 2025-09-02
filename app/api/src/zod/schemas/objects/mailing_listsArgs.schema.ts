import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { mailing_listsSelectObjectSchema } from './mailing_listsSelect.schema';
import { mailing_listsIncludeObjectSchema } from './mailing_listsInclude.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  select: z.lazy(() => mailing_listsSelectObjectSchema).optional(),
  include: z.lazy(() => mailing_listsIncludeObjectSchema).optional()
}).strict();
export const mailing_listsArgsObjectSchema = makeSchema();
export const mailing_listsArgsObjectZodSchema = makeSchema();
