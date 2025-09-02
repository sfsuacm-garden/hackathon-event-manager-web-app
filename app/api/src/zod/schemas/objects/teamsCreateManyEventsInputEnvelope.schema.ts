import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { teamsCreateManyEventsInputObjectSchema } from './teamsCreateManyEventsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  data: z.union([z.lazy(() => teamsCreateManyEventsInputObjectSchema), z.lazy(() => teamsCreateManyEventsInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const teamsCreateManyEventsInputEnvelopeObjectSchema: z.ZodType<Prisma.teamsCreateManyEventsInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.teamsCreateManyEventsInputEnvelope>;
export const teamsCreateManyEventsInputEnvelopeObjectZodSchema = makeSchema();
