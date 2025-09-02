import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { t_shirt_sizeSchema } from '../enums/t_shirt_size.schema';
import { NestedEnumt_shirt_sizeNullableWithAggregatesFilterObjectSchema } from './NestedEnumt_shirt_sizeNullableWithAggregatesFilter.schema';
import { NestedIntNullableFilterObjectSchema } from './NestedIntNullableFilter.schema';
import { NestedEnumt_shirt_sizeNullableFilterObjectSchema } from './NestedEnumt_shirt_sizeNullableFilter.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  equals: t_shirt_sizeSchema.nullish(),
  in: t_shirt_sizeSchema.array().nullish(),
  notIn: t_shirt_sizeSchema.array().nullish(),
  not: z.union([t_shirt_sizeSchema, z.lazy(() => NestedEnumt_shirt_sizeNullableWithAggregatesFilterObjectSchema)]).nullish(),
  _count: z.lazy(() => NestedIntNullableFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumt_shirt_sizeNullableFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumt_shirt_sizeNullableFilterObjectSchema).optional()
}).strict();
export const Enumt_shirt_sizeNullableWithAggregatesFilterObjectSchema: z.ZodType<Prisma.Enumt_shirt_sizeNullableWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.Enumt_shirt_sizeNullableWithAggregatesFilter>;
export const Enumt_shirt_sizeNullableWithAggregatesFilterObjectZodSchema = makeSchema();
