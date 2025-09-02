import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UuidFilterObjectSchema } from './UuidFilter.schema';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  AND: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
  OR: z.lazy(makeSchema).array().optional(),
  NOT: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
  id: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  email_domain: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  country_code: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  created_at: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.date()]).optional()
}).strict();
export const schoolsWhereInputObjectSchema: z.ZodType<Prisma.schoolsWhereInput> = makeSchema() as unknown as z.ZodType<Prisma.schoolsWhereInput>;
export const schoolsWhereInputObjectZodSchema = makeSchema();
