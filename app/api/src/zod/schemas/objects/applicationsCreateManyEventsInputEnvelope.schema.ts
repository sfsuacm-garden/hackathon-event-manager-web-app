import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { applicationsCreateManyEventsInputObjectSchema } from './applicationsCreateManyEventsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  data: z.union([z.lazy(() => applicationsCreateManyEventsInputObjectSchema), z.lazy(() => applicationsCreateManyEventsInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const applicationsCreateManyEventsInputEnvelopeObjectSchema: z.ZodType<Prisma.applicationsCreateManyEventsInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.applicationsCreateManyEventsInputEnvelope>;
export const applicationsCreateManyEventsInputEnvelopeObjectZodSchema = makeSchema();
