import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { team_membersWhereInputObjectSchema } from './team_membersWhereInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  every: z.lazy(() => team_membersWhereInputObjectSchema).optional(),
  some: z.lazy(() => team_membersWhereInputObjectSchema).optional(),
  none: z.lazy(() => team_membersWhereInputObjectSchema).optional()
}).strict();
export const Team_membersListRelationFilterObjectSchema: z.ZodType<Prisma.Team_membersListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.Team_membersListRelationFilter>;
export const Team_membersListRelationFilterObjectZodSchema = makeSchema();
