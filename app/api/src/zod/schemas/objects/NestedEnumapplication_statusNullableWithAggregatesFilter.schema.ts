import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { application_statusSchema } from '../enums/application_status.schema';
import { NestedIntNullableFilterObjectSchema } from './NestedIntNullableFilter.schema';
import { NestedEnumapplication_statusNullableFilterObjectSchema } from './NestedEnumapplication_statusNullableFilter.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  equals: application_statusSchema.nullish(),
  in: application_statusSchema.array().nullish(),
  notIn: application_statusSchema.array().nullish(),
  not: z.union([application_statusSchema, z.lazy(makeSchema)]).nullish(),
  _count: z.lazy(() => NestedIntNullableFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumapplication_statusNullableFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumapplication_statusNullableFilterObjectSchema).optional()
}).strict();
export const NestedEnumapplication_statusNullableWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumapplication_statusNullableWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.NestedEnumapplication_statusNullableWithAggregatesFilter>;
export const NestedEnumapplication_statusNullableWithAggregatesFilterObjectZodSchema = makeSchema();
