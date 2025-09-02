import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { mailing_listsOrderByWithRelationInputObjectSchema } from './mailing_listsOrderByWithRelationInput.schema';
import { profilesOrderByWithRelationInputObjectSchema } from './profilesOrderByWithRelationInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  mailing_list_id: SortOrderSchema.optional(),
  user_id: SortOrderSchema.optional(),
  mailing_lists: z.lazy(() => mailing_listsOrderByWithRelationInputObjectSchema).optional(),
  profiles: z.lazy(() => profilesOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const mailing_list_membersOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.mailing_list_membersOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.mailing_list_membersOrderByWithRelationInput>;
export const mailing_list_membersOrderByWithRelationInputObjectZodSchema = makeSchema();
