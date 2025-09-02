import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { teamsWhereInputObjectSchema } from './teamsWhereInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  every: z.lazy(() => teamsWhereInputObjectSchema).optional(),
  some: z.lazy(() => teamsWhereInputObjectSchema).optional(),
  none: z.lazy(() => teamsWhereInputObjectSchema).optional()
}).strict();
export const TeamsListRelationFilterObjectSchema: z.ZodType<Prisma.TeamsListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.TeamsListRelationFilter>;
export const TeamsListRelationFilterObjectZodSchema = makeSchema();
