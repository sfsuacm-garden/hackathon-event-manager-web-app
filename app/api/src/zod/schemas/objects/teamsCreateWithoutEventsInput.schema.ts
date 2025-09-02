import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { team_membersCreateNestedManyWithoutTeamsInputObjectSchema } from './team_membersCreateNestedManyWithoutTeamsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string().optional(),
  name: z.string().nullish(),
  created_at: z.date().nullish(),
  team_members: z.lazy(() => team_membersCreateNestedManyWithoutTeamsInputObjectSchema).optional()
}).strict();
export const teamsCreateWithoutEventsInputObjectSchema: z.ZodType<Prisma.teamsCreateWithoutEventsInput> = makeSchema() as unknown as z.ZodType<Prisma.teamsCreateWithoutEventsInput>;
export const teamsCreateWithoutEventsInputObjectZodSchema = makeSchema();
