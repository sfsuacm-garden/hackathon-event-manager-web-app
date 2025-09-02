import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: SortOrderSchema.optional(),
  event_id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  created_at: SortOrderSchema.optional()
}).strict();
export const teamsCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.teamsCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.teamsCountOrderByAggregateInput>;
export const teamsCountOrderByAggregateInputObjectZodSchema = makeSchema();
