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
export const profilesMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.profilesMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.profilesMinOrderByAggregateInput>;
export const profilesMinOrderByAggregateInputObjectZodSchema = makeSchema();
