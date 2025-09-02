import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { teamsCountOrderByAggregateInputObjectSchema } from './teamsCountOrderByAggregateInput.schema';
import { teamsMaxOrderByAggregateInputObjectSchema } from './teamsMaxOrderByAggregateInput.schema';
import { teamsMinOrderByAggregateInputObjectSchema } from './teamsMinOrderByAggregateInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: SortOrderSchema.optional(),
  event_id: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  name: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  created_at: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  _count: z.lazy(() => teamsCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => teamsMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => teamsMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const teamsOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.teamsOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.teamsOrderByWithAggregationInput>;
export const teamsOrderByWithAggregationInputObjectZodSchema = makeSchema();
