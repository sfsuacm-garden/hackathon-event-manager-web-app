import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  user_id: z.string()
}).strict();
export const mailing_list_membersCreateManyMailing_listsInputObjectSchema: z.ZodType<Prisma.mailing_list_membersCreateManyMailing_listsInput> = makeSchema() as unknown as z.ZodType<Prisma.mailing_list_membersCreateManyMailing_listsInput>;
export const mailing_list_membersCreateManyMailing_listsInputObjectZodSchema = makeSchema();
