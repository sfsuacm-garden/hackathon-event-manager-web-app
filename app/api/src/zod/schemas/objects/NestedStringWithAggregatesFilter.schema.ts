import { z } from 'zod';
import type { Prisma } from '@prisma/client';
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
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([z.string(), z.lazy(makeSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedStringFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedStringFilterObjectSchema).optional()
}).strict();
export const NestedStringWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.NestedStringWithAggregatesFilter>;
export const NestedStringWithAggregatesFilterObjectZodSchema = makeSchema();
