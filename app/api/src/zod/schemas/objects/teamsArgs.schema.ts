import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { teamsSelectObjectSchema } from './teamsSelect.schema';
import { teamsIncludeObjectSchema } from './teamsInclude.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  select: z.lazy(() => teamsSelectObjectSchema).optional(),
  include: z.lazy(() => teamsIncludeObjectSchema).optional()
}).strict();
export const teamsArgsObjectSchema = makeSchema();
export const teamsArgsObjectZodSchema = makeSchema();
