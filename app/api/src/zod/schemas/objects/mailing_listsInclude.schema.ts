import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { Mailing_list_membersFindManySchema } from '../findManymailing_list_members.schema';
import { eventsArgsObjectSchema } from './eventsArgs.schema';
import { mailing_listsCountOutputTypeArgsObjectSchema } from './mailing_listsCountOutputTypeArgs.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  mailing_list_members: z.union([z.boolean(), z.lazy(() => Mailing_list_membersFindManySchema)]).optional(),
  events: z.union([z.boolean(), z.lazy(() => eventsArgsObjectSchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => mailing_listsCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const mailing_listsIncludeObjectSchema: z.ZodType<Prisma.mailing_listsInclude> = makeSchema() as unknown as z.ZodType<Prisma.mailing_listsInclude>;
export const mailing_listsIncludeObjectZodSchema = makeSchema();
