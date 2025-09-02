import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: SortOrderSchema.optional(),
  event_id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  created_at: SortOrderSchema.optional()
}).strict();
export const mailing_listsCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.mailing_listsCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.mailing_listsCountOrderByAggregateInput>;
export const mailing_listsCountOrderByAggregateInputObjectZodSchema = makeSchema();
