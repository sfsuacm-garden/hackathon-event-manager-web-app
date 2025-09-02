import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { profilesSelectObjectSchema } from './profilesSelect.schema';
import { profilesIncludeObjectSchema } from './profilesInclude.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  select: z.lazy(() => profilesSelectObjectSchema).optional(),
  include: z.lazy(() => profilesIncludeObjectSchema).optional()
}).strict();
export const profilesArgsObjectSchema = makeSchema();
export const profilesArgsObjectZodSchema = makeSchema();
