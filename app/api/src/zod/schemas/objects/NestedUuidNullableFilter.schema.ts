import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  equals: z.string().nullish(),
  in: z.string().array().nullish(),
  notIn: z.string().array().nullish(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  not: z.union([z.string(), z.lazy(makeSchema)]).nullish()
}).strict();
export const NestedUuidNullableFilterObjectSchema: z.ZodType<Prisma.NestedUuidNullableFilter> = makeSchema() as unknown as z.ZodType<Prisma.NestedUuidNullableFilter>;
export const NestedUuidNullableFilterObjectZodSchema = makeSchema();
