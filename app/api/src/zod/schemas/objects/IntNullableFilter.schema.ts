import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { NestedIntNullableFilterObjectSchema } from './NestedIntNullableFilter.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  equals: z.number().int().nullish(),
  in: z.number().int().array().nullish(),
  notIn: z.number().int().array().nullish(),
  lt: z.number().int().optional(),
  lte: z.number().int().optional(),
  gt: z.number().int().optional(),
  gte: z.number().int().optional(),
  not: z.union([z.number().int(), z.lazy(() => NestedIntNullableFilterObjectSchema)]).nullish()
}).strict();
export const IntNullableFilterObjectSchema: z.ZodType<Prisma.IntNullableFilter> = makeSchema() as unknown as z.ZodType<Prisma.IntNullableFilter>;
export const IntNullableFilterObjectZodSchema = makeSchema();
