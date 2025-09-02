import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  team_id: SortOrderSchema.optional(),
  user_id: SortOrderSchema.optional(),
  is_admin: SortOrderSchema.optional(),
  joined_at: SortOrderSchema.optional()
}).strict();
export const team_membersCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.team_membersCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.team_membersCountOrderByAggregateInput>;
export const team_membersCountOrderByAggregateInputObjectZodSchema = makeSchema();
