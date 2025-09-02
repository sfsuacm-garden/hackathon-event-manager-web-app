import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { team_membersCreateManyProfilesInputObjectSchema } from './team_membersCreateManyProfilesInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  data: z.union([z.lazy(() => team_membersCreateManyProfilesInputObjectSchema), z.lazy(() => team_membersCreateManyProfilesInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const team_membersCreateManyProfilesInputEnvelopeObjectSchema: z.ZodType<Prisma.team_membersCreateManyProfilesInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.team_membersCreateManyProfilesInputEnvelope>;
export const team_membersCreateManyProfilesInputEnvelopeObjectZodSchema = makeSchema();
