import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const mailing_list_membersOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.mailing_list_membersOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.mailing_list_membersOrderByRelationAggregateInput>;
export const mailing_list_membersOrderByRelationAggregateInputObjectZodSchema = makeSchema();
