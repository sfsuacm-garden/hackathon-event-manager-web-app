import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const team_membersOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.team_membersOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.team_membersOrderByRelationAggregateInput>;
export const team_membersOrderByRelationAggregateInputObjectZodSchema = makeSchema();
