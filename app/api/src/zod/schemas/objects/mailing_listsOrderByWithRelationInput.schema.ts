import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { mailing_list_membersOrderByRelationAggregateInputObjectSchema } from './mailing_list_membersOrderByRelationAggregateInput.schema';
import { eventsOrderByWithRelationInputObjectSchema } from './eventsOrderByWithRelationInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: SortOrderSchema.optional(),
  event_id: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  name: SortOrderSchema.optional(),
  created_at: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  mailing_list_members: z.lazy(() => mailing_list_membersOrderByRelationAggregateInputObjectSchema).optional(),
  events: z.lazy(() => eventsOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const mailing_listsOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.mailing_listsOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.mailing_listsOrderByWithRelationInput>;
export const mailing_listsOrderByWithRelationInputObjectZodSchema = makeSchema();
