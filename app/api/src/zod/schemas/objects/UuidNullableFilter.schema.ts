import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { QueryModeSchema } from '../enums/QueryMode.schema';
import { NestedUuidNullableFilterObjectSchema } from './NestedUuidNullableFilter.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  equals: z.string().nullish(),
  in: z.string().array().nullish(),
  notIn: z.string().array().nullish(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  mode: QueryModeSchema.optional(),
  not: z.union([z.string(), z.lazy(() => NestedUuidNullableFilterObjectSchema)]).nullish()
}).strict();
export const UuidNullableFilterObjectSchema: z.ZodType<Prisma.UuidNullableFilter> = makeSchema() as unknown as z.ZodType<Prisma.UuidNullableFilter>;
export const UuidNullableFilterObjectZodSchema = makeSchema();
