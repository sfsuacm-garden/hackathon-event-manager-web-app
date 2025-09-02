import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { team_membersUncheckedCreateNestedManyWithoutTeamsInputObjectSchema } from './team_membersUncheckedCreateNestedManyWithoutTeamsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string().optional(),
  name: z.string().nullish(),
  created_at: z.date().nullish(),
  team_members: z.lazy(() => team_membersUncheckedCreateNestedManyWithoutTeamsInputObjectSchema).optional()
}).strict();
export const teamsUncheckedCreateWithoutEventsInputObjectSchema: z.ZodType<Prisma.teamsUncheckedCreateWithoutEventsInput> = makeSchema() as unknown as z.ZodType<Prisma.teamsUncheckedCreateWithoutEventsInput>;
export const teamsUncheckedCreateWithoutEventsInputObjectZodSchema = makeSchema();
