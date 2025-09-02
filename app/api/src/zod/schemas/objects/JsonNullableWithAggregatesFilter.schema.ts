import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { QueryModeSchema } from '../enums/QueryMode.schema';
import { NestedIntNullableFilterObjectSchema } from './NestedIntNullableFilter.schema';
import { NestedJsonNullableFilterObjectSchema } from './NestedJsonNullableFilter.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = (): z.ZodObject<any> => z.object({
  equals: jsonSchema.optional(),
  path: z.string().array().optional(),
  mode: QueryModeSchema.optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_starts_with: jsonSchema.nullish(),
  array_ends_with: jsonSchema.nullish(),
  array_contains: jsonSchema.nullish(),
  lt: jsonSchema.optional(),
  lte: jsonSchema.optional(),
  gt: jsonSchema.optional(),
  gte: jsonSchema.optional(),
  not: jsonSchema.optional(),
  _count: z.lazy(() => NestedIntNullableFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedJsonNullableFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedJsonNullableFilterObjectSchema).optional()
}).strict();
export const JsonNullableWithAggregatesFilterObjectSchema: z.ZodType<Prisma.JsonNullableWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.JsonNullableWithAggregatesFilter>;
export const JsonNullableWithAggregatesFilterObjectZodSchema = makeSchema();
