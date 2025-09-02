import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.literal(true).optional(),
  event_id: z.literal(true).optional(),
  name: z.literal(true).optional(),
  created_at: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const Mailing_listsCountAggregateInputObjectSchema: z.ZodType<Prisma.Mailing_listsCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.Mailing_listsCountAggregateInputType>;
export const Mailing_listsCountAggregateInputObjectZodSchema = makeSchema();
