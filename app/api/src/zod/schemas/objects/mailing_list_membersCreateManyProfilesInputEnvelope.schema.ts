import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { mailing_list_membersCreateManyProfilesInputObjectSchema } from './mailing_list_membersCreateManyProfilesInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  data: z.union([z.lazy(() => mailing_list_membersCreateManyProfilesInputObjectSchema), z.lazy(() => mailing_list_membersCreateManyProfilesInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const mailing_list_membersCreateManyProfilesInputEnvelopeObjectSchema: z.ZodType<Prisma.mailing_list_membersCreateManyProfilesInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.mailing_list_membersCreateManyProfilesInputEnvelope>;
export const mailing_list_membersCreateManyProfilesInputEnvelopeObjectZodSchema = makeSchema();
