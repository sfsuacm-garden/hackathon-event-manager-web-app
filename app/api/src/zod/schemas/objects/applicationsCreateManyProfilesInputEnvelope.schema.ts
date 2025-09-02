import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { applicationsCreateManyProfilesInputObjectSchema } from './applicationsCreateManyProfilesInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  data: z.union([z.lazy(() => applicationsCreateManyProfilesInputObjectSchema), z.lazy(() => applicationsCreateManyProfilesInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const applicationsCreateManyProfilesInputEnvelopeObjectSchema: z.ZodType<Prisma.applicationsCreateManyProfilesInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.applicationsCreateManyProfilesInputEnvelope>;
export const applicationsCreateManyProfilesInputEnvelopeObjectZodSchema = makeSchema();
