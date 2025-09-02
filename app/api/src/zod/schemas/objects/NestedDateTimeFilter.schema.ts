import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  equals: z.date().optional(),
  in: z.union([z.date().array(), z.string().datetime().array()]).optional(),
  notIn: z.union([z.date().array(), z.string().datetime().array()]).optional(),
  lt: z.date().optional(),
  lte: z.date().optional(),
  gt: z.date().optional(),
  gte: z.date().optional(),
  not: z.union([z.date(), z.lazy(makeSchema)]).optional()
}).strict();
export const NestedDateTimeFilterObjectSchema: z.ZodType<Prisma.NestedDateTimeFilter> = makeSchema() as unknown as z.ZodType<Prisma.NestedDateTimeFilter>;
export const NestedDateTimeFilterObjectZodSchema = makeSchema();
