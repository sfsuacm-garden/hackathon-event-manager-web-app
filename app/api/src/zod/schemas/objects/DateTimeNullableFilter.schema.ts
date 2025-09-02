import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { NestedDateTimeNullableFilterObjectSchema } from './NestedDateTimeNullableFilter.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  equals: z.date().nullish(),
  in: z.union([z.date().array(), z.string().datetime().array()]).nullish(),
  notIn: z.union([z.date().array(), z.string().datetime().array()]).nullish(),
  lt: z.date().optional(),
  lte: z.date().optional(),
  gt: z.date().optional(),
  gte: z.date().optional(),
  not: z.union([z.date(), z.lazy(() => NestedDateTimeNullableFilterObjectSchema)]).nullish()
}).strict();
export const DateTimeNullableFilterObjectSchema: z.ZodType<Prisma.DateTimeNullableFilter> = makeSchema() as unknown as z.ZodType<Prisma.DateTimeNullableFilter>;
export const DateTimeNullableFilterObjectZodSchema = makeSchema();
