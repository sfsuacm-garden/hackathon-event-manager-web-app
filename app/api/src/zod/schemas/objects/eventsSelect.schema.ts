import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ApplicationsFindManySchema } from '../findManyapplications.schema';
import { Mailing_listsFindManySchema } from '../findManymailing_lists.schema';
import { TeamsFindManySchema } from '../findManyteams.schema';
import { eventsCountOutputTypeArgsObjectSchema } from './eventsCountOutputTypeArgs.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  start_date: z.boolean().optional(),
  end_date: z.boolean().optional(),
  created_at: z.boolean().optional(),
  is_event_live: z.boolean().optional(),
  is_team_managment_open: z.boolean().optional(),
  applications: z.union([z.boolean(), z.lazy(() => ApplicationsFindManySchema)]).optional(),
  mailing_lists: z.union([z.boolean(), z.lazy(() => Mailing_listsFindManySchema)]).optional(),
  teams: z.union([z.boolean(), z.lazy(() => TeamsFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => eventsCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const eventsSelectObjectSchema: z.ZodType<Prisma.eventsSelect> = makeSchema() as unknown as z.ZodType<Prisma.eventsSelect>;
export const eventsSelectObjectZodSchema = makeSchema();
