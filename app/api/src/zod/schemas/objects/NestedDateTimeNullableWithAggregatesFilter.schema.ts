import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { NestedIntNullableFilterObjectSchema } from './NestedIntNullableFilter.schema';
import { NestedDateTimeNullableFilterObjectSchema } from './NestedDateTimeNullableFilter.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  equals: z.date().nullish(),
  in: z.union([z.date().array(), z.string().datetime().array()]).nullish(),
  notIn: z.union([z.date().array(), z.string().datetime().array()]).nullish(),
  lt: z.date().optional(),
  lte: z.date().optional(),
  gt: z.date().optional(),
  gte: z.date().optional(),
  not: z.union([z.date(), z.lazy(makeSchema)]).nullish(),
  _count: z.lazy(() => NestedIntNullableFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterObjectSchema).optional()
}).strict();
export const NestedDateTimeNullableWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter>;
export const NestedDateTimeNullableWithAggregatesFilterObjectZodSchema = makeSchema();
