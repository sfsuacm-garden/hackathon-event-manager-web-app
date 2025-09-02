import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UuidWithAggregatesFilterObjectSchema } from './UuidWithAggregatesFilter.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  AND: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
  OR: z.lazy(makeSchema).array().optional(),
  NOT: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
  mailing_list_id: z.union([z.lazy(() => UuidWithAggregatesFilterObjectSchema), z.string()]).optional(),
  user_id: z.union([z.lazy(() => UuidWithAggregatesFilterObjectSchema), z.string()]).optional()
}).strict();
export const mailing_list_membersScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.mailing_list_membersScalarWhereWithAggregatesInput> = makeSchema() as unknown as z.ZodType<Prisma.mailing_list_membersScalarWhereWithAggregatesInput>;
export const mailing_list_membersScalarWhereWithAggregatesInputObjectZodSchema = makeSchema();
