import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string().optional(),
  event_id: z.string().nullish(),
  name: z.string().nullish(),
  created_at: z.date().nullish()
}).strict();
export const teamsUncheckedCreateWithoutTeam_membersInputObjectSchema: z.ZodType<Prisma.teamsUncheckedCreateWithoutTeam_membersInput> = makeSchema() as unknown as z.ZodType<Prisma.teamsUncheckedCreateWithoutTeam_membersInput>;
export const teamsUncheckedCreateWithoutTeam_membersInputObjectZodSchema = makeSchema();
