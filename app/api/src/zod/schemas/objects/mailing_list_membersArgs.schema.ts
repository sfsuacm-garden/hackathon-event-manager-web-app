import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { mailing_list_membersSelectObjectSchema } from './mailing_list_membersSelect.schema';
import { mailing_list_membersIncludeObjectSchema } from './mailing_list_membersInclude.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  select: z.lazy(() => mailing_list_membersSelectObjectSchema).optional(),
  include: z.lazy(() => mailing_list_membersIncludeObjectSchema).optional()
}).strict();
export const mailing_list_membersArgsObjectSchema = makeSchema();
export const mailing_list_membersArgsObjectZodSchema = makeSchema();
