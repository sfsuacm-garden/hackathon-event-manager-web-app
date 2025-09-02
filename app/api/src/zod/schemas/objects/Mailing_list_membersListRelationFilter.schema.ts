import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { mailing_list_membersWhereInputObjectSchema } from './mailing_list_membersWhereInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  every: z.lazy(() => mailing_list_membersWhereInputObjectSchema).optional(),
  some: z.lazy(() => mailing_list_membersWhereInputObjectSchema).optional(),
  none: z.lazy(() => mailing_list_membersWhereInputObjectSchema).optional()
}).strict();
export const Mailing_list_membersListRelationFilterObjectSchema: z.ZodType<Prisma.Mailing_list_membersListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.Mailing_list_membersListRelationFilter>;
export const Mailing_list_membersListRelationFilterObjectZodSchema = makeSchema();
