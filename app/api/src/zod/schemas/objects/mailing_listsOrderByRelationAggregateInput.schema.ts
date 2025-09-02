import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const mailing_listsOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.mailing_listsOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.mailing_listsOrderByRelationAggregateInput>;
export const mailing_listsOrderByRelationAggregateInputObjectZodSchema = makeSchema();
