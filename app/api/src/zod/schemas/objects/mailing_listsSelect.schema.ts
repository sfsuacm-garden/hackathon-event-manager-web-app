import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { Mailing_list_membersFindManySchema } from '../findManymailing_list_members.schema';
import { eventsArgsObjectSchema } from './eventsArgs.schema';
import { mailing_listsCountOutputTypeArgsObjectSchema } from './mailing_listsCountOutputTypeArgs.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.boolean().optional(),
  event_id: z.boolean().optional(),
  name: z.boolean().optional(),
  created_at: z.boolean().optional(),
  mailing_list_members: z.union([z.boolean(), z.lazy(() => Mailing_list_membersFindManySchema)]).optional(),
  events: z.union([z.boolean(), z.lazy(() => eventsArgsObjectSchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => mailing_listsCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const mailing_listsSelectObjectSchema: z.ZodType<Prisma.mailing_listsSelect> = makeSchema() as unknown as z.ZodType<Prisma.mailing_listsSelect>;
export const mailing_listsSelectObjectZodSchema = makeSchema();
