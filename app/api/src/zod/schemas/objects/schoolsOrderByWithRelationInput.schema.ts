import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  email_domain: SortOrderSchema.optional(),
  country_code: SortOrderSchema.optional(),
  created_at: SortOrderSchema.optional()
}).strict();
export const schoolsOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.schoolsOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.schoolsOrderByWithRelationInput>;
export const schoolsOrderByWithRelationInputObjectZodSchema = makeSchema();
