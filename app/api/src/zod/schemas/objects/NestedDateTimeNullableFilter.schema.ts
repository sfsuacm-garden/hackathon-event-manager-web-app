import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  equals: z.date().nullish(),
  in: z.union([z.date().array(), z.string().datetime().array()]).nullish(),
  notIn: z.union([z.date().array(), z.string().datetime().array()]).nullish(),
  lt: z.date().optional(),
  lte: z.date().optional(),
  gt: z.date().optional(),
  gte: z.date().optional(),
  not: z.union([z.date(), z.lazy(makeSchema)]).nullish()
}).strict();
export const NestedDateTimeNullableFilterObjectSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = makeSchema() as unknown as z.ZodType<Prisma.NestedDateTimeNullableFilter>;
export const NestedDateTimeNullableFilterObjectZodSchema = makeSchema();
