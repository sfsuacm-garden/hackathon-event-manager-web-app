import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UuidWithAggregatesFilterObjectSchema } from './UuidWithAggregatesFilter.schema';
import { StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { DateTimeNullableWithAggregatesFilterObjectSchema } from './DateTimeNullableWithAggregatesFilter.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  AND: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
  OR: z.lazy(makeSchema).array().optional(),
  NOT: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
  id: z.union([z.lazy(() => UuidWithAggregatesFilterObjectSchema), z.string()]).optional(),
  email: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  full_name: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  role: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  created_at: z.union([z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema), z.date()]).nullish()
}).strict();
export const profilesScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.profilesScalarWhereWithAggregatesInput> = makeSchema() as unknown as z.ZodType<Prisma.profilesScalarWhereWithAggregatesInput>;
export const profilesScalarWhereWithAggregatesInputObjectZodSchema = makeSchema();
