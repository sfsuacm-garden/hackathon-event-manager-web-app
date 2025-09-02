import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: SortOrderSchema.optional(),
  event_id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  created_at: SortOrderSchema.optional()
}).strict();
export const teamsMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.teamsMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.teamsMinOrderByAggregateInput>;
export const teamsMinOrderByAggregateInputObjectZodSchema = makeSchema();
