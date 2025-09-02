import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.literal(true).optional(),
  event_id: z.literal(true).optional(),
  name: z.literal(true).optional(),
  created_at: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const TeamsCountAggregateInputObjectSchema: z.ZodType<Prisma.TeamsCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.TeamsCountAggregateInputType>;
export const TeamsCountAggregateInputObjectZodSchema = makeSchema();
