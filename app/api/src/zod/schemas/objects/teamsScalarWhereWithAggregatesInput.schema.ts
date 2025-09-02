import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UuidWithAggregatesFilterObjectSchema } from './UuidWithAggregatesFilter.schema';
import { UuidNullableWithAggregatesFilterObjectSchema } from './UuidNullableWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { DateTimeNullableWithAggregatesFilterObjectSchema } from './DateTimeNullableWithAggregatesFilter.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  AND: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
  OR: z.lazy(makeSchema).array().optional(),
  NOT: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
  id: z.union([z.lazy(() => UuidWithAggregatesFilterObjectSchema), z.string()]).optional(),
  event_id: z.union([z.lazy(() => UuidNullableWithAggregatesFilterObjectSchema), z.string()]).nullish(),
  name: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).nullish(),
  created_at: z.union([z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema), z.date()]).nullish()
}).strict();
export const teamsScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.teamsScalarWhereWithAggregatesInput> = makeSchema() as unknown as z.ZodType<Prisma.teamsScalarWhereWithAggregatesInput>;
export const teamsScalarWhereWithAggregatesInputObjectZodSchema = makeSchema();
