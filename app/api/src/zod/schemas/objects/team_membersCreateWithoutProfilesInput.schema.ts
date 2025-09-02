import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { teamsCreateNestedOneWithoutTeam_membersInputObjectSchema } from './teamsCreateNestedOneWithoutTeam_membersInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  is_admin: z.boolean().nullish(),
  joined_at: z.date().nullish(),
  teams: z.lazy(() => teamsCreateNestedOneWithoutTeam_membersInputObjectSchema)
}).strict();
export const team_membersCreateWithoutProfilesInputObjectSchema: z.ZodType<Prisma.team_membersCreateWithoutProfilesInput> = makeSchema() as unknown as z.ZodType<Prisma.team_membersCreateWithoutProfilesInput>;
export const team_membersCreateWithoutProfilesInputObjectZodSchema = makeSchema();
