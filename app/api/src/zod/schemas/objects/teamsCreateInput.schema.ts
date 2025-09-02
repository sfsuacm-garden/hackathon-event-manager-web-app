import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { team_membersCreateNestedManyWithoutTeamsInputObjectSchema } from './team_membersCreateNestedManyWithoutTeamsInput.schema';
import { eventsCreateNestedOneWithoutTeamsInputObjectSchema } from './eventsCreateNestedOneWithoutTeamsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string().optional(),
  name: z.string().nullish(),
  created_at: z.date().nullish(),
  team_members: z.lazy(() => team_membersCreateNestedManyWithoutTeamsInputObjectSchema).optional(),
  events: z.lazy(() => eventsCreateNestedOneWithoutTeamsInputObjectSchema).optional()
}).strict();
export const teamsCreateInputObjectSchema: z.ZodType<Prisma.teamsCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.teamsCreateInput>;
export const teamsCreateInputObjectZodSchema = makeSchema();
