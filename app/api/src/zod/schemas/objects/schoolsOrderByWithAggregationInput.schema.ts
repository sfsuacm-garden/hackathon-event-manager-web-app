import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { schoolsCountOrderByAggregateInputObjectSchema } from './schoolsCountOrderByAggregateInput.schema';
import { schoolsMaxOrderByAggregateInputObjectSchema } from './schoolsMaxOrderByAggregateInput.schema';
import { schoolsMinOrderByAggregateInputObjectSchema } from './schoolsMinOrderByAggregateInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  email_domain: SortOrderSchema.optional(),
  country_code: SortOrderSchema.optional(),
  created_at: SortOrderSchema.optional(),
  _count: z.lazy(() => schoolsCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => schoolsMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => schoolsMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const schoolsOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.schoolsOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.schoolsOrderByWithAggregationInput>;
export const schoolsOrderByWithAggregationInputObjectZodSchema = makeSchema();
