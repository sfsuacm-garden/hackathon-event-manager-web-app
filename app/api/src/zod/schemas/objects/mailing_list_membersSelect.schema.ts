import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { mailing_listsArgsObjectSchema } from './mailing_listsArgs.schema';
import { profilesArgsObjectSchema } from './profilesArgs.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  mailing_list_id: z.boolean().optional(),
  user_id: z.boolean().optional(),
  mailing_lists: z.union([z.boolean(), z.lazy(() => mailing_listsArgsObjectSchema)]).optional(),
  profiles: z.union([z.boolean(), z.lazy(() => profilesArgsObjectSchema)]).optional()
}).strict();
export const mailing_list_membersSelectObjectSchema: z.ZodType<Prisma.mailing_list_membersSelect> = makeSchema() as unknown as z.ZodType<Prisma.mailing_list_membersSelect>;
export const mailing_list_membersSelectObjectZodSchema = makeSchema();
