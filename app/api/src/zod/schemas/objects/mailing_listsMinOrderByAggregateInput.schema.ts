import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: SortOrderSchema.optional(),
  event_id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  created_at: SortOrderSchema.optional()
}).strict();
export const mailing_listsMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.mailing_listsMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.mailing_listsMinOrderByAggregateInput>;
export const mailing_listsMinOrderByAggregateInputObjectZodSchema = makeSchema();
