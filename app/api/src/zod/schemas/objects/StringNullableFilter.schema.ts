import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { QueryModeSchema } from '../enums/QueryMode.schema';
import { NestedStringNullableFilterObjectSchema } from './NestedStringNullableFilter.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  equals: z.string().nullish(),
  in: z.string().array().nullish(),
  notIn: z.string().array().nullish(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: QueryModeSchema.optional(),
  not: z.union([z.string(), z.lazy(() => NestedStringNullableFilterObjectSchema)]).nullish()
}).strict();
export const StringNullableFilterObjectSchema: z.ZodType<Prisma.StringNullableFilter> = makeSchema() as unknown as z.ZodType<Prisma.StringNullableFilter>;
export const StringNullableFilterObjectZodSchema = makeSchema();
