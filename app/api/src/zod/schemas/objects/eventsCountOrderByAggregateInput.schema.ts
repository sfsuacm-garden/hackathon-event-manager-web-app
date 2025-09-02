import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  description: SortOrderSchema.optional(),
  start_date: SortOrderSchema.optional(),
  end_date: SortOrderSchema.optional(),
  created_at: SortOrderSchema.optional(),
  is_event_live: SortOrderSchema.optional(),
  is_team_managment_open: SortOrderSchema.optional()
}).strict();
export const eventsCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.eventsCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.eventsCountOrderByAggregateInput>;
export const eventsCountOrderByAggregateInputObjectZodSchema = makeSchema();
