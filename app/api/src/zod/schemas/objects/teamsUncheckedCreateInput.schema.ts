import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { team_membersUncheckedCreateNestedManyWithoutTeamsInputObjectSchema } from './team_membersUncheckedCreateNestedManyWithoutTeamsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string().optional(),
  event_id: z.string().nullish(),
  name: z.string().nullish(),
  created_at: z.date().nullish(),
  team_members: z.lazy(() => team_membersUncheckedCreateNestedManyWithoutTeamsInputObjectSchema).optional()
}).strict();
export const teamsUncheckedCreateInputObjectSchema: z.ZodType<Prisma.teamsUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.teamsUncheckedCreateInput>;
export const teamsUncheckedCreateInputObjectZodSchema = makeSchema();
