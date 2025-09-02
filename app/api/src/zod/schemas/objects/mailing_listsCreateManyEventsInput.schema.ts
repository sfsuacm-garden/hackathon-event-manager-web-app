import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string().optional(),
  name: z.string(),
  created_at: z.date().nullish()
}).strict();
export const mailing_listsCreateManyEventsInputObjectSchema: z.ZodType<Prisma.mailing_listsCreateManyEventsInput> = makeSchema() as unknown as z.ZodType<Prisma.mailing_listsCreateManyEventsInput>;
export const mailing_listsCreateManyEventsInputObjectZodSchema = makeSchema();
