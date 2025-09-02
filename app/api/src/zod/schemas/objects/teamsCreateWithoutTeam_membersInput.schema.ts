import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { eventsCreateNestedOneWithoutTeamsInputObjectSchema } from './eventsCreateNestedOneWithoutTeamsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string().optional(),
  name: z.string().nullish(),
  created_at: z.date().nullish(),
  events: z.lazy(() => eventsCreateNestedOneWithoutTeamsInputObjectSchema).optional()
}).strict();
export const teamsCreateWithoutTeam_membersInputObjectSchema: z.ZodType<Prisma.teamsCreateWithoutTeam_membersInput> = makeSchema() as unknown as z.ZodType<Prisma.teamsCreateWithoutTeam_membersInput>;
export const teamsCreateWithoutTeam_membersInputObjectZodSchema = makeSchema();
