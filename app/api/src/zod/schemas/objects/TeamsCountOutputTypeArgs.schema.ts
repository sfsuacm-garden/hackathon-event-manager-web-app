import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TeamsCountOutputTypeSelectObjectSchema } from './TeamsCountOutputTypeSelect.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  select: z.lazy(() => TeamsCountOutputTypeSelectObjectSchema).optional()
}).strict();
export const TeamsCountOutputTypeArgsObjectSchema = makeSchema();
export const TeamsCountOutputTypeArgsObjectZodSchema = makeSchema();
