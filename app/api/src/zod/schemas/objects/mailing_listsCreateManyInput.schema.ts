import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string().optional(),
  event_id: z.string().nullish(),
  name: z.string(),
  created_at: z.date().nullish()
}).strict();
export const mailing_listsCreateManyInputObjectSchema: z.ZodType<Prisma.mailing_listsCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.mailing_listsCreateManyInput>;
export const mailing_listsCreateManyInputObjectZodSchema = makeSchema();
