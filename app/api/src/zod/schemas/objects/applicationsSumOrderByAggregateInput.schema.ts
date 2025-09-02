import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  graduation_year: SortOrderSchema.optional()
}).strict();
export const applicationsSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.applicationsSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.applicationsSumOrderByAggregateInput>;
export const applicationsSumOrderByAggregateInputObjectZodSchema = makeSchema();
