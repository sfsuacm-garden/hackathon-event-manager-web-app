import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { mailing_listsCreateManyEventsInputObjectSchema } from './mailing_listsCreateManyEventsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  data: z.union([z.lazy(() => mailing_listsCreateManyEventsInputObjectSchema), z.lazy(() => mailing_listsCreateManyEventsInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const mailing_listsCreateManyEventsInputEnvelopeObjectSchema: z.ZodType<Prisma.mailing_listsCreateManyEventsInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.mailing_listsCreateManyEventsInputEnvelope>;
export const mailing_listsCreateManyEventsInputEnvelopeObjectZodSchema = makeSchema();
