import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { QueryModeSchema } from '../enums/QueryMode.schema';
import { NestedUuidWithAggregatesFilterObjectSchema } from './NestedUuidWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedStringFilterObjectSchema } from './NestedStringFilter.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  mode: QueryModeSchema.optional(),
  not: z.union([z.string(), z.lazy(() => NestedUuidWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedStringFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedStringFilterObjectSchema).optional()
}).strict();
export const UuidWithAggregatesFilterObjectSchema: z.ZodType<Prisma.UuidWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.UuidWithAggregatesFilter>;
export const UuidWithAggregatesFilterObjectZodSchema = makeSchema();
