import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { teamsArgsObjectSchema } from './teamsArgs.schema';
import { profilesArgsObjectSchema } from './profilesArgs.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  team_id: z.boolean().optional(),
  user_id: z.boolean().optional(),
  is_admin: z.boolean().optional(),
  joined_at: z.boolean().optional(),
  teams: z.union([z.boolean(), z.lazy(() => teamsArgsObjectSchema)]).optional(),
  profiles: z.union([z.boolean(), z.lazy(() => profilesArgsObjectSchema)]).optional()
}).strict();
export const team_membersSelectObjectSchema: z.ZodType<Prisma.team_membersSelect> = makeSchema() as unknown as z.ZodType<Prisma.team_membersSelect>;
export const team_membersSelectObjectZodSchema = makeSchema();
