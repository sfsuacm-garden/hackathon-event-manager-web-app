import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { mailing_list_membersCreateManyMailing_listsInputObjectSchema } from './mailing_list_membersCreateManyMailing_listsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  data: z.union([z.lazy(() => mailing_list_membersCreateManyMailing_listsInputObjectSchema), z.lazy(() => mailing_list_membersCreateManyMailing_listsInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const mailing_list_membersCreateManyMailing_listsInputEnvelopeObjectSchema: z.ZodType<Prisma.mailing_list_membersCreateManyMailing_listsInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.mailing_list_membersCreateManyMailing_listsInputEnvelope>;
export const mailing_list_membersCreateManyMailing_listsInputEnvelopeObjectZodSchema = makeSchema();
