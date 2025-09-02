import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  team_id: SortOrderSchema.optional(),
  user_id: SortOrderSchema.optional(),
  is_admin: SortOrderSchema.optional(),
  joined_at: SortOrderSchema.optional()
}).strict();
export const team_membersMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.team_membersMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.team_membersMinOrderByAggregateInput>;
export const team_membersMinOrderByAggregateInputObjectZodSchema = makeSchema();
