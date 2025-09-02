import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { teamsWhereInputObjectSchema } from './teamsWhereInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  is: z.lazy(() => teamsWhereInputObjectSchema).optional(),
  isNot: z.lazy(() => teamsWhereInputObjectSchema).optional()
}).strict();
export const TeamsScalarRelationFilterObjectSchema: z.ZodType<Prisma.TeamsScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.TeamsScalarRelationFilter>;
export const TeamsScalarRelationFilterObjectZodSchema = makeSchema();
