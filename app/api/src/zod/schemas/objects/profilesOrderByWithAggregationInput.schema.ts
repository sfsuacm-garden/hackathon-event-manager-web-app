import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { profilesCountOrderByAggregateInputObjectSchema } from './profilesCountOrderByAggregateInput.schema';
import { profilesMaxOrderByAggregateInputObjectSchema } from './profilesMaxOrderByAggregateInput.schema';
import { profilesMinOrderByAggregateInputObjectSchema } from './profilesMinOrderByAggregateInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: SortOrderSchema.optional(),
  email: SortOrderSchema.optional(),
  full_name: SortOrderSchema.optional(),
  role: SortOrderSchema.optional(),
  created_at: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  _count: z.lazy(() => profilesCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => profilesMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => profilesMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const profilesOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.profilesOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.profilesOrderByWithAggregationInput>;
export const profilesOrderByWithAggregationInputObjectZodSchema = makeSchema();
