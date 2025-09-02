import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { Team_membersFindManySchema } from '../findManyteam_members.schema';
import { eventsArgsObjectSchema } from './eventsArgs.schema';
import { teamsCountOutputTypeArgsObjectSchema } from './teamsCountOutputTypeArgs.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.boolean().optional(),
  event_id: z.boolean().optional(),
  name: z.boolean().optional(),
  created_at: z.boolean().optional(),
  team_members: z.union([z.boolean(), z.lazy(() => Team_membersFindManySchema)]).optional(),
  events: z.union([z.boolean(), z.lazy(() => eventsArgsObjectSchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => teamsCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const teamsSelectObjectSchema: z.ZodType<Prisma.teamsSelect> = makeSchema() as unknown as z.ZodType<Prisma.teamsSelect>;
export const teamsSelectObjectZodSchema = makeSchema();
