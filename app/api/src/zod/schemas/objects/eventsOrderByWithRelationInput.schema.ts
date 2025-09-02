import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { applicationsOrderByRelationAggregateInputObjectSchema } from './applicationsOrderByRelationAggregateInput.schema';
import { mailing_listsOrderByRelationAggregateInputObjectSchema } from './mailing_listsOrderByRelationAggregateInput.schema';
import { teamsOrderByRelationAggregateInputObjectSchema } from './teamsOrderByRelationAggregateInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  description: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  start_date: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  end_date: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  created_at: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  is_event_live: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  is_team_managment_open: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  applications: z.lazy(() => applicationsOrderByRelationAggregateInputObjectSchema).optional(),
  mailing_lists: z.lazy(() => mailing_listsOrderByRelationAggregateInputObjectSchema).optional(),
  teams: z.lazy(() => teamsOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
export const eventsOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.eventsOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.eventsOrderByWithRelationInput>;
export const eventsOrderByWithRelationInputObjectZodSchema = makeSchema();
