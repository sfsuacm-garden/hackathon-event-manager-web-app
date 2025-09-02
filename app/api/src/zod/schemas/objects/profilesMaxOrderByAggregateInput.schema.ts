import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: SortOrderSchema.optional(),
  email: SortOrderSchema.optional(),
  full_name: SortOrderSchema.optional(),
  role: SortOrderSchema.optional(),
  created_at: SortOrderSchema.optional()
}).strict();
export const profilesMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.profilesMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.profilesMaxOrderByAggregateInput>;
export const profilesMaxOrderByAggregateInputObjectZodSchema = makeSchema();
