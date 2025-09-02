import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { eventsCountOrderByAggregateInputObjectSchema } from './eventsCountOrderByAggregateInput.schema';
import { eventsMaxOrderByAggregateInputObjectSchema } from './eventsMaxOrderByAggregateInput.schema';
import { eventsMinOrderByAggregateInputObjectSchema } from './eventsMinOrderByAggregateInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  description: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  start_date: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  end_date: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  created_at: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  is_event_live: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  is_team_managment_open: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  _count: z.lazy(() => eventsCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => eventsMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => eventsMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const eventsOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.eventsOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.eventsOrderByWithAggregationInput>;
export const eventsOrderByWithAggregationInputObjectZodSchema = makeSchema();
