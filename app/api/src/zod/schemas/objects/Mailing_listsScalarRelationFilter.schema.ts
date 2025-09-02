import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { mailing_listsWhereInputObjectSchema } from './mailing_listsWhereInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  is: z.lazy(() => mailing_listsWhereInputObjectSchema).optional(),
  isNot: z.lazy(() => mailing_listsWhereInputObjectSchema).optional()
}).strict();
export const Mailing_listsScalarRelationFilterObjectSchema: z.ZodType<Prisma.Mailing_listsScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.Mailing_listsScalarRelationFilter>;
export const Mailing_listsScalarRelationFilterObjectZodSchema = makeSchema();
