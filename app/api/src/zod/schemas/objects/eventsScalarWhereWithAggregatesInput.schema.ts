import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UuidWithAggregatesFilterObjectSchema } from './UuidWithAggregatesFilter.schema';
import { StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { DateTimeNullableWithAggregatesFilterObjectSchema } from './DateTimeNullableWithAggregatesFilter.schema';
import { BoolNullableWithAggregatesFilterObjectSchema } from './BoolNullableWithAggregatesFilter.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  AND: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
  OR: z.lazy(makeSchema).array().optional(),
  NOT: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
  id: z.union([z.lazy(() => UuidWithAggregatesFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  description: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).nullish(),
  start_date: z.union([z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema), z.date()]).nullish(),
  end_date: z.union([z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema), z.date()]).nullish(),
  created_at: z.union([z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema), z.date()]).nullish(),
  is_event_live: z.union([z.lazy(() => BoolNullableWithAggregatesFilterObjectSchema), z.boolean()]).nullish(),
  is_team_managment_open: z.union([z.lazy(() => BoolNullableWithAggregatesFilterObjectSchema), z.boolean()]).nullish()
}).strict();
export const eventsScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.eventsScalarWhereWithAggregatesInput> = makeSchema() as unknown as z.ZodType<Prisma.eventsScalarWhereWithAggregatesInput>;
export const eventsScalarWhereWithAggregatesInputObjectZodSchema = makeSchema();
