import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string().optional(),
  event_id: z.string().nullish(),
  name: z.string(),
  created_at: z.date().nullish()
}).strict();
export const mailing_listsUncheckedCreateWithoutMailing_list_membersInputObjectSchema: z.ZodType<Prisma.mailing_listsUncheckedCreateWithoutMailing_list_membersInput> = makeSchema() as unknown as z.ZodType<Prisma.mailing_listsUncheckedCreateWithoutMailing_list_membersInput>;
export const mailing_listsUncheckedCreateWithoutMailing_list_membersInputObjectZodSchema = makeSchema();
