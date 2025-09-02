import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string()
}).strict();
export const mailing_listsWhereUniqueInputObjectSchema: z.ZodType<Prisma.mailing_listsWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.mailing_listsWhereUniqueInput>;
export const mailing_listsWhereUniqueInputObjectZodSchema = makeSchema();
