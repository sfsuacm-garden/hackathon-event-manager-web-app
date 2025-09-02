import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UuidFilterObjectSchema } from './UuidFilter.schema';
import { BoolNullableFilterObjectSchema } from './BoolNullableFilter.schema';
import { DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  AND: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
  OR: z.lazy(makeSchema).array().optional(),
  NOT: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
  team_id: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  user_id: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  is_admin: z.union([z.lazy(() => BoolNullableFilterObjectSchema), z.boolean()]).nullish(),
  joined_at: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.date()]).nullish()
}).strict();
export const team_membersScalarWhereInputObjectSchema: z.ZodType<Prisma.team_membersScalarWhereInput> = makeSchema() as unknown as z.ZodType<Prisma.team_membersScalarWhereInput>;
export const team_membersScalarWhereInputObjectZodSchema = makeSchema();
