import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { mailing_listsCountOrderByAggregateInputObjectSchema } from './mailing_listsCountOrderByAggregateInput.schema';
import { mailing_listsMaxOrderByAggregateInputObjectSchema } from './mailing_listsMaxOrderByAggregateInput.schema';
import { mailing_listsMinOrderByAggregateInputObjectSchema } from './mailing_listsMinOrderByAggregateInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: SortOrderSchema.optional(),
  event_id: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  name: SortOrderSchema.optional(),
  created_at: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  _count: z.lazy(() => mailing_listsCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => mailing_listsMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => mailing_listsMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const mailing_listsOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.mailing_listsOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.mailing_listsOrderByWithAggregationInput>;
export const mailing_listsOrderByWithAggregationInputObjectZodSchema = makeSchema();
