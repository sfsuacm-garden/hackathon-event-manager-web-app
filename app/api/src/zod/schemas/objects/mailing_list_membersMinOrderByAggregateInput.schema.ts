import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  mailing_list_id: SortOrderSchema.optional(),
  user_id: SortOrderSchema.optional()
}).strict();
export const mailing_list_membersMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.mailing_list_membersMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.mailing_list_membersMinOrderByAggregateInput>;
export const mailing_list_membersMinOrderByAggregateInputObjectZodSchema = makeSchema();
