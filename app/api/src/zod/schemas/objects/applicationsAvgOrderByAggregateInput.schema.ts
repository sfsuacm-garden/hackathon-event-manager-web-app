import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  graduation_year: SortOrderSchema.optional()
}).strict();
export const applicationsAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.applicationsAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.applicationsAvgOrderByAggregateInput>;
export const applicationsAvgOrderByAggregateInputObjectZodSchema = makeSchema();
