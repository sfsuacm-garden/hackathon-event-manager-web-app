import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UuidFilterObjectSchema } from './UuidFilter.schema';
import { UuidNullableFilterObjectSchema } from './UuidNullableFilter.schema';
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  AND: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
  OR: z.lazy(makeSchema).array().optional(),
  NOT: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
  id: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  event_id: z.union([z.lazy(() => UuidNullableFilterObjectSchema), z.string()]).nullish(),
  name: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).nullish(),
  created_at: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.date()]).nullish()
}).strict();
export const teamsScalarWhereInputObjectSchema: z.ZodType<Prisma.teamsScalarWhereInput> = makeSchema() as unknown as z.ZodType<Prisma.teamsScalarWhereInput>;
export const teamsScalarWhereInputObjectZodSchema = makeSchema();
