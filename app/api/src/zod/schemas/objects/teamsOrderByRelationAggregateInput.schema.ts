import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const teamsOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.teamsOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.teamsOrderByRelationAggregateInput>;
export const teamsOrderByRelationAggregateInputObjectZodSchema = makeSchema();
