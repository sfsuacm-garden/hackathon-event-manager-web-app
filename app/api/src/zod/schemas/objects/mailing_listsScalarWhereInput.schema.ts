import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UuidFilterObjectSchema } from './UuidFilter.schema';
import { UuidNullableFilterObjectSchema } from './UuidNullableFilter.schema';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  AND: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
  OR: z.lazy(makeSchema).array().optional(),
  NOT: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
  id: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  event_id: z.union([z.lazy(() => UuidNullableFilterObjectSchema), z.string()]).nullish(),
  name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  created_at: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.date()]).nullish()
}).strict();
export const mailing_listsScalarWhereInputObjectSchema: z.ZodType<Prisma.mailing_listsScalarWhereInput> = makeSchema() as unknown as z.ZodType<Prisma.mailing_listsScalarWhereInput>;
export const mailing_listsScalarWhereInputObjectZodSchema = makeSchema();
