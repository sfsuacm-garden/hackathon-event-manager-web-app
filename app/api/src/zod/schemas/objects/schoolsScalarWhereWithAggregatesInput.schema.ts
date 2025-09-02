import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UuidWithAggregatesFilterObjectSchema } from './UuidWithAggregatesFilter.schema';
import { StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  AND: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
  OR: z.lazy(makeSchema).array().optional(),
  NOT: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
  id: z.union([z.lazy(() => UuidWithAggregatesFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  email_domain: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  country_code: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  created_at: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.date()]).optional()
}).strict();
export const schoolsScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.schoolsScalarWhereWithAggregatesInput> = makeSchema() as unknown as z.ZodType<Prisma.schoolsScalarWhereWithAggregatesInput>;
export const schoolsScalarWhereWithAggregatesInputObjectZodSchema = makeSchema();
