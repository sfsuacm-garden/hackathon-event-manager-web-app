import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  team_id: z.string(),
  is_admin: z.boolean().nullish(),
  joined_at: z.date().nullish()
}).strict();
export const team_membersUncheckedCreateWithoutProfilesInputObjectSchema: z.ZodType<Prisma.team_membersUncheckedCreateWithoutProfilesInput> = makeSchema() as unknown as z.ZodType<Prisma.team_membersUncheckedCreateWithoutProfilesInput>;
export const team_membersUncheckedCreateWithoutProfilesInputObjectZodSchema = makeSchema();
