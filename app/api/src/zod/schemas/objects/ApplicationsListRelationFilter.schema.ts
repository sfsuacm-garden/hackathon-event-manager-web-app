import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { applicationsWhereInputObjectSchema } from './applicationsWhereInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  every: z.lazy(() => applicationsWhereInputObjectSchema).optional(),
  some: z.lazy(() => applicationsWhereInputObjectSchema).optional(),
  none: z.lazy(() => applicationsWhereInputObjectSchema).optional()
}).strict();
export const ApplicationsListRelationFilterObjectSchema: z.ZodType<Prisma.ApplicationsListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.ApplicationsListRelationFilter>;
export const ApplicationsListRelationFilterObjectZodSchema = makeSchema();
