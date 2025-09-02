import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UuidFilterObjectSchema } from './UuidFilter.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  AND: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
  OR: z.lazy(makeSchema).array().optional(),
  NOT: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
  mailing_list_id: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  user_id: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional()
}).strict();
export const mailing_list_membersScalarWhereInputObjectSchema: z.ZodType<Prisma.mailing_list_membersScalarWhereInput> = makeSchema() as unknown as z.ZodType<Prisma.mailing_list_membersScalarWhereInput>;
export const mailing_list_membersScalarWhereInputObjectZodSchema = makeSchema();
