import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { mailing_listsWhereInputObjectSchema } from './mailing_listsWhereInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  every: z.lazy(() => mailing_listsWhereInputObjectSchema).optional(),
  some: z.lazy(() => mailing_listsWhereInputObjectSchema).optional(),
  none: z.lazy(() => mailing_listsWhereInputObjectSchema).optional()
}).strict();
export const Mailing_listsListRelationFilterObjectSchema: z.ZodType<Prisma.Mailing_listsListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.Mailing_listsListRelationFilter>;
export const Mailing_listsListRelationFilterObjectZodSchema = makeSchema();
