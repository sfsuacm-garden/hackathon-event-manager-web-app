import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  team_id: z.string(),
  is_admin: z.boolean().nullish(),
  joined_at: z.date().nullish()
}).strict();
export const team_membersCreateManyProfilesInputObjectSchema: z.ZodType<Prisma.team_membersCreateManyProfilesInput> = makeSchema() as unknown as z.ZodType<Prisma.team_membersCreateManyProfilesInput>;
export const team_membersCreateManyProfilesInputObjectZodSchema = makeSchema();
