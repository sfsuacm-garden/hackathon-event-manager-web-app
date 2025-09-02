import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { teamsOrderByWithRelationInputObjectSchema } from './teamsOrderByWithRelationInput.schema';
import { profilesOrderByWithRelationInputObjectSchema } from './profilesOrderByWithRelationInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  team_id: SortOrderSchema.optional(),
  user_id: SortOrderSchema.optional(),
  is_admin: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  joined_at: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  teams: z.lazy(() => teamsOrderByWithRelationInputObjectSchema).optional(),
  profiles: z.lazy(() => profilesOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const team_membersOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.team_membersOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.team_membersOrderByWithRelationInput>;
export const team_membersOrderByWithRelationInputObjectZodSchema = makeSchema();
