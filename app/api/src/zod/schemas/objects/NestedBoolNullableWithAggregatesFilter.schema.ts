import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { NestedIntNullableFilterObjectSchema } from './NestedIntNullableFilter.schema';
import { NestedBoolNullableFilterObjectSchema } from './NestedBoolNullableFilter.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  equals: z.boolean().nullish(),
  not: z.union([z.boolean(), z.lazy(makeSchema)]).nullish(),
  _count: z.lazy(() => NestedIntNullableFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedBoolNullableFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedBoolNullableFilterObjectSchema).optional()
}).strict();
export const NestedBoolNullableWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedBoolNullableWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.NestedBoolNullableWithAggregatesFilter>;
export const NestedBoolNullableWithAggregatesFilterObjectZodSchema = makeSchema();
