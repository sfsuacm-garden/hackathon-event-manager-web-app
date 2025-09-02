import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { profilesCreateNestedOneWithoutTeam_membersInputObjectSchema } from './profilesCreateNestedOneWithoutTeam_membersInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  is_admin: z.boolean().nullish(),
  joined_at: z.date().nullish(),
  profiles: z.lazy(() => profilesCreateNestedOneWithoutTeam_membersInputObjectSchema)
}).strict();
export const team_membersCreateWithoutTeamsInputObjectSchema: z.ZodType<Prisma.team_membersCreateWithoutTeamsInput> = makeSchema() as unknown as z.ZodType<Prisma.team_membersCreateWithoutTeamsInput>;
export const team_membersCreateWithoutTeamsInputObjectZodSchema = makeSchema();
