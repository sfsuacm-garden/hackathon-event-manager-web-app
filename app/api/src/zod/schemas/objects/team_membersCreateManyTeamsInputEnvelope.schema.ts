import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { team_membersCreateManyTeamsInputObjectSchema } from './team_membersCreateManyTeamsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  data: z.union([z.lazy(() => team_membersCreateManyTeamsInputObjectSchema), z.lazy(() => team_membersCreateManyTeamsInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const team_membersCreateManyTeamsInputEnvelopeObjectSchema: z.ZodType<Prisma.team_membersCreateManyTeamsInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.team_membersCreateManyTeamsInputEnvelope>;
export const team_membersCreateManyTeamsInputEnvelopeObjectZodSchema = makeSchema();
