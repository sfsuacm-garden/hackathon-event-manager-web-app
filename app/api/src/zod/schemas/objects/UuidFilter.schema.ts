import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { QueryModeSchema } from '../enums/QueryMode.schema';
import { NestedUuidFilterObjectSchema } from './NestedUuidFilter.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  mode: QueryModeSchema.optional(),
  not: z.union([z.string(), z.lazy(() => NestedUuidFilterObjectSchema)]).optional()
}).strict();
export const UuidFilterObjectSchema: z.ZodType<Prisma.UuidFilter> = makeSchema() as unknown as z.ZodType<Prisma.UuidFilter>;
export const UuidFilterObjectZodSchema = makeSchema();
