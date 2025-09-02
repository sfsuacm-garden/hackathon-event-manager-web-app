import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { team_membersSelectObjectSchema } from './team_membersSelect.schema';
import { team_membersIncludeObjectSchema } from './team_membersInclude.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  select: z.lazy(() => team_membersSelectObjectSchema).optional(),
  include: z.lazy(() => team_membersIncludeObjectSchema).optional()
}).strict();
export const team_membersArgsObjectSchema = makeSchema();
export const team_membersArgsObjectZodSchema = makeSchema();
