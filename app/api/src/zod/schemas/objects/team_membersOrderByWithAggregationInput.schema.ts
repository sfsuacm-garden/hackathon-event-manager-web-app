import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { team_membersCountOrderByAggregateInputObjectSchema } from './team_membersCountOrderByAggregateInput.schema';
import { team_membersMaxOrderByAggregateInputObjectSchema } from './team_membersMaxOrderByAggregateInput.schema';
import { team_membersMinOrderByAggregateInputObjectSchema } from './team_membersMinOrderByAggregateInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  team_id: SortOrderSchema.optional(),
  user_id: SortOrderSchema.optional(),
  is_admin: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  joined_at: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  _count: z.lazy(() => team_membersCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => team_membersMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => team_membersMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const team_membersOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.team_membersOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.team_membersOrderByWithAggregationInput>;
export const team_membersOrderByWithAggregationInputObjectZodSchema = makeSchema();
