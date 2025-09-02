import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UuidWithAggregatesFilterObjectSchema } from './UuidWithAggregatesFilter.schema';
import { BoolNullableWithAggregatesFilterObjectSchema } from './BoolNullableWithAggregatesFilter.schema';
import { DateTimeNullableWithAggregatesFilterObjectSchema } from './DateTimeNullableWithAggregatesFilter.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  AND: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
  OR: z.lazy(makeSchema).array().optional(),
  NOT: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
  team_id: z.union([z.lazy(() => UuidWithAggregatesFilterObjectSchema), z.string()]).optional(),
  user_id: z.union([z.lazy(() => UuidWithAggregatesFilterObjectSchema), z.string()]).optional(),
  is_admin: z.union([z.lazy(() => BoolNullableWithAggregatesFilterObjectSchema), z.boolean()]).nullish(),
  joined_at: z.union([z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema), z.date()]).nullish()
}).strict();
export const team_membersScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.team_membersScalarWhereWithAggregatesInput> = makeSchema() as unknown as z.ZodType<Prisma.team_membersScalarWhereWithAggregatesInput>;
export const team_membersScalarWhereWithAggregatesInputObjectZodSchema = makeSchema();
