import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { NestedIntNullableFilterObjectSchema } from './NestedIntNullableFilter.schema';
import { NestedStringNullableFilterObjectSchema } from './NestedStringNullableFilter.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  equals: z.string().nullish(),
  in: z.string().array().nullish(),
  notIn: z.string().array().nullish(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  not: z.union([z.string(), z.lazy(makeSchema)]).nullish(),
  _count: z.lazy(() => NestedIntNullableFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterObjectSchema).optional()
}).strict();
export const NestedUuidNullableWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedUuidNullableWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.NestedUuidNullableWithAggregatesFilter>;
export const NestedUuidNullableWithAggregatesFilterObjectZodSchema = makeSchema();
