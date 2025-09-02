import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  user_id: z.string(),
  is_admin: z.boolean().nullish(),
  joined_at: z.date().nullish()
}).strict();
export const team_membersUncheckedCreateWithoutTeamsInputObjectSchema: z.ZodType<Prisma.team_membersUncheckedCreateWithoutTeamsInput> = makeSchema() as unknown as z.ZodType<Prisma.team_membersUncheckedCreateWithoutTeamsInput>;
export const team_membersUncheckedCreateWithoutTeamsInputObjectZodSchema = makeSchema();
