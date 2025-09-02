import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.literal(true).optional(),
  name: z.literal(true).optional(),
  description: z.literal(true).optional(),
  start_date: z.literal(true).optional(),
  end_date: z.literal(true).optional(),
  created_at: z.literal(true).optional(),
  is_event_live: z.literal(true).optional(),
  is_team_managment_open: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const EventsCountAggregateInputObjectSchema: z.ZodType<Prisma.EventsCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.EventsCountAggregateInputType>;
export const EventsCountAggregateInputObjectZodSchema = makeSchema();
