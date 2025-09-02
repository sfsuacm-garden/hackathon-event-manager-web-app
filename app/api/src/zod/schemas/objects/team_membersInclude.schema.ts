import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { teamsArgsObjectSchema } from './teamsArgs.schema';
import { profilesArgsObjectSchema } from './profilesArgs.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  teams: z.union([z.boolean(), z.lazy(() => teamsArgsObjectSchema)]).optional(),
  profiles: z.union([z.boolean(), z.lazy(() => profilesArgsObjectSchema)]).optional()
}).strict();
export const team_membersIncludeObjectSchema: z.ZodType<Prisma.team_membersInclude> = makeSchema() as unknown as z.ZodType<Prisma.team_membersInclude>;
export const team_membersIncludeObjectZodSchema = makeSchema();
