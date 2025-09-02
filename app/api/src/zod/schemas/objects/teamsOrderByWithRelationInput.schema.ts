import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { team_membersOrderByRelationAggregateInputObjectSchema } from './team_membersOrderByRelationAggregateInput.schema';
import { eventsOrderByWithRelationInputObjectSchema } from './eventsOrderByWithRelationInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: SortOrderSchema.optional(),
  event_id: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  name: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  created_at: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  team_members: z.lazy(() => team_membersOrderByRelationAggregateInputObjectSchema).optional(),
  events: z.lazy(() => eventsOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const teamsOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.teamsOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.teamsOrderByWithRelationInput>;
export const teamsOrderByWithRelationInputObjectZodSchema = makeSchema();
