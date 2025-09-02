import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { teamsCreateNestedOneWithoutTeam_membersInputObjectSchema } from './teamsCreateNestedOneWithoutTeam_membersInput.schema';
import { profilesCreateNestedOneWithoutTeam_membersInputObjectSchema } from './profilesCreateNestedOneWithoutTeam_membersInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  is_admin: z.boolean().nullish(),
  joined_at: z.date().nullish(),
  teams: z.lazy(() => teamsCreateNestedOneWithoutTeam_membersInputObjectSchema),
  profiles: z.lazy(() => profilesCreateNestedOneWithoutTeam_membersInputObjectSchema)
}).strict();
export const team_membersCreateInputObjectSchema: z.ZodType<Prisma.team_membersCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.team_membersCreateInput>;
export const team_membersCreateInputObjectZodSchema = makeSchema();
