import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { applicationsOrderByRelationAggregateInputObjectSchema } from './applicationsOrderByRelationAggregateInput.schema';
import { mailing_list_membersOrderByRelationAggregateInputObjectSchema } from './mailing_list_membersOrderByRelationAggregateInput.schema';
import { team_membersOrderByRelationAggregateInputObjectSchema } from './team_membersOrderByRelationAggregateInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: SortOrderSchema.optional(),
  email: SortOrderSchema.optional(),
  full_name: SortOrderSchema.optional(),
  role: SortOrderSchema.optional(),
  created_at: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  applications: z.lazy(() => applicationsOrderByRelationAggregateInputObjectSchema).optional(),
  mailing_list_members: z.lazy(() => mailing_list_membersOrderByRelationAggregateInputObjectSchema).optional(),
  team_members: z.lazy(() => team_membersOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
export const profilesOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.profilesOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.profilesOrderByWithRelationInput>;
export const profilesOrderByWithRelationInputObjectZodSchema = makeSchema();
