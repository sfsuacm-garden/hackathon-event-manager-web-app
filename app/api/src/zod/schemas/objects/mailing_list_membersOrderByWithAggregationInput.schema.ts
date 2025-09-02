import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { mailing_list_membersCountOrderByAggregateInputObjectSchema } from './mailing_list_membersCountOrderByAggregateInput.schema';
import { mailing_list_membersMaxOrderByAggregateInputObjectSchema } from './mailing_list_membersMaxOrderByAggregateInput.schema';
import { mailing_list_membersMinOrderByAggregateInputObjectSchema } from './mailing_list_membersMinOrderByAggregateInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  mailing_list_id: SortOrderSchema.optional(),
  user_id: SortOrderSchema.optional(),
  _count: z.lazy(() => mailing_list_membersCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => mailing_list_membersMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => mailing_list_membersMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const mailing_list_membersOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.mailing_list_membersOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.mailing_list_membersOrderByWithAggregationInput>;
export const mailing_list_membersOrderByWithAggregationInputObjectZodSchema = makeSchema();
