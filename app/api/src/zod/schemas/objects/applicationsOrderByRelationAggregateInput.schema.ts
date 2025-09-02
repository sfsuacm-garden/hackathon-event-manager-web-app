import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const applicationsOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.applicationsOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.applicationsOrderByRelationAggregateInput>;
export const applicationsOrderByRelationAggregateInputObjectZodSchema = makeSchema();
